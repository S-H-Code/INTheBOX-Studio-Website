import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address format']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [30, 'Phone number is too long']
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: {
        values: [
          'Business Website',
          'Landing Page',
          'E-commerce Platform',
          'Website Redesign',
          'Web App Development',
          'SEO / Growth'
        ],
        message: '{VALUE} is not a supported service'
      }
    },
    budgetTier: {
      type: String,
      enum: [
        'Starter (~₹6k)',
        'Growth (~₹12k)',
        'Premium (~₹20k+)',
        'Custom',
        'Custom Enterprise'
      ],
      default: 'Growth (~₹12k)'
    },
    timeline: {
      type: String,
      default: 'Standard (1-2 weeks)'
    },
    estimatedBudget: {
      type: Number,
      min: 0
    },
    details: {
      type: String,
      required: [true, 'Project details are required'],
      trim: true,
      maxlength: [2000, 'Project details cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'pending', 'contacted', 'qualified', 'closed', 'archived'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

// Index for query optimization
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ email: 1 });

export default mongoose.model('Enquiry', enquirySchema);
