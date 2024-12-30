// pages/api/list-images.js

import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const { folder, page = 1, limit = 20 } = req.query;

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://your-framer-site.framer.website'); // Replace with your Framer site
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  if (!folder) {
    return res.status(400).json({ error: 'Folder parameter is required.' });
  }

  try {
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: limit,
      context: true,
      tags: true,
      // Use pagination if needed
    });

    res.setHeader('freshpressburger.com 'https://your-framer-site.framer.website'); // Replace with your Framer site
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json({ resources: resources.resources });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images.' });
  }
}
