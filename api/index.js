import app from '../server.js';
import { connectDB } from '../config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (e) {
      console.warn('[Vercel Serverless] DB connection skipped or failed:', e.message);
    }
  }
  return app(req, res);
}
