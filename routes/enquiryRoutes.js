import express from 'express';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';
import { getDbStatus } from '../config/db.js';

const router = express.Router();

// Resilient in-memory fallback store if MongoDB is not running locally during development
const fallbackStore = [];

// Helper to sanitize strings
const sanitize = (str) => (typeof str === 'string' ? str.trim().replace(/[<>]/g, '') : str);

// @route   POST /api/enquiries
// @desc    Submit a new client enquiry / project brief
// @access  Public
router.post('/', async (req, res) => {
  try {
    let { name, email, phone, service, budgetTier, timeline, estimatedBudget, details } = req.body;

    // Sanitize text inputs
    name = sanitize(name);
    email = sanitize(email)?.toLowerCase();
    phone = sanitize(phone);
    service = sanitize(service);
    budgetTier = sanitize(budgetTier) || 'Growth (~₹12k)';
    timeline = sanitize(timeline) || 'Standard (1-2 weeks)';
    details = sanitize(details);

    // Validation checks
    if (!name || !email || !phone || !service || !details) {
      return res.status(400).json({
        success: false,
        message: 'All required fields (name, email, phone, service, details) must be filled.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid work email address.'
      });
    }

    const validServices = [
      'Business Website',
      'Landing Page',
      'E-commerce Platform',
      'Website Redesign',
      'Web App Development',
      'SEO / Growth'
    ];
    if (!validServices.includes(service)) {
      return res.status(400).json({
        success: false,
        message: `Service must be one of: ${validServices.join(', ')}`
      });
    }

    if (getDbStatus() && mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.create({
        name,
        email,
        phone,
        service,
        budgetTier,
        timeline,
        estimatedBudget: estimatedBudget ? Number(estimatedBudget) : undefined,
        details
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully. Our studio team will reach out within 24 hours.',
        data: {
          id: enquiry._id,
          name: enquiry.name,
          service: enquiry.service,
          createdAt: enquiry.createdAt,
          storage: 'mongodb'
        }
      });
    } else {
      // In-memory fallback during local testing without active MongoDB
      const fallbackEntry = {
        _id: 'local_' + Date.now() + Math.random().toString(36).substring(2, 7),
        name,
        email,
        phone,
        service,
        budgetTier,
        timeline,
        estimatedBudget: estimatedBudget ? Number(estimatedBudget) : 12000,
        details,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      fallbackStore.unshift(fallbackEntry);

      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully. Our studio team will reach out within 24 hours.',
        data: {
          id: fallbackEntry._id,
          name: fallbackEntry.name,
          service: fallbackEntry.service,
          createdAt: fallbackEntry.createdAt,
          storage: 'memory-fallback'
        }
      });
    }
  } catch (error) {
    console.error('[Enquiry POST Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while logging enquiry.'
    });
  }
});

// @route   GET /api/enquiries/stats
// @desc    Get aggregated enquiry metrics
// @access  Internal
router.get('/stats', async (req, res) => {
  try {
    if (getDbStatus() && mongoose.connection.readyState === 1) {
      const total = await Enquiry.countDocuments();
      const newCount = await Enquiry.countDocuments({ status: 'new' });
      const contactedCount = await Enquiry.countDocuments({ status: 'contacted' });
      return res.json({
        success: true,
        stats: { total, newCount, contactedCount, mode: 'mongodb' }
      });
    } else {
      return res.json({
        success: true,
        stats: {
          total: fallbackStore.length,
          newCount: fallbackStore.filter((e) => e.status === 'new').length,
          contactedCount: fallbackStore.filter((e) => e.status === 'contacted').length,
          mode: 'memory-fallback'
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/enquiries
// @desc    Retrieve all client enquiries (sorted by newest first)
// @access  Internal / Studio Admin
router.get('/', async (req, res) => {
  try {
    const { status, service, limit = 100 } = req.query;

    if (getDbStatus() && mongoose.connection.readyState === 1) {
      const filter = {};
      if (status) filter.status = status;
      if (service) filter.service = service;

      const enquiries = await Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .limit(Math.min(Number(limit), 200));

      return res.status(200).json({
        success: true,
        count: enquiries.length,
        data: enquiries,
        source: 'mongodb'
      });
    } else {
      let filtered = [...fallbackStore];
      if (status) filtered = filtered.filter((e) => e.status === status);
      if (service) filtered = filtered.filter((e) => e.service === service);

      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered.slice(0, Number(limit)),
        source: 'memory-fallback'
      });
    }
  } catch (error) {
    console.error('[Enquiry GET Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries'
    });
  }
});

// @route   PATCH /api/enquiries/:id/status
// @desc    Update status of an enquiry (new, contacted, qualified, closed, archived)
// @access  Internal / Studio Admin
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'pending', 'contacted', 'qualified', 'closed', 'archived'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowed.join(', ')}`
      });
    }

    if (getDbStatus() && mongoose.connection.readyState === 1) {
      const updated = await Enquiry.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, data: updated });
    } else {
      const entry = fallbackStore.find((e) => e._id === req.params.id);
      if (!entry) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      entry.status = status;
      entry.updatedAt = new Date().toISOString();
      return res.json({ success: true, data: entry });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
