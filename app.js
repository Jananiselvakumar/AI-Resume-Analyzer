// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || '123456';

// Enable CORS for all requests
app.use(cors());

// Setup multer to handle file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check API key
function checkApiKey(req, res, next) {
  const clientKey = req.headers['x-api-key'];
  if (!clientKey || clientKey !== API_KEY) {
    return res.status(401).json({ result: '❌ Unauthorized: Invalid API Key' });
  }
  next();
}

// POST endpoint to analyze resume
app.post('/analyze', checkApiKey, upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ result: '⚠️ No file uploaded' });
  }

  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ result: '❌ Only PDF files are allowed' });
  }

  // Simulate resume analysis
  const fileName = req.file.originalname;
  const fileSizeKB = (req.file.size / 1024).toFixed(2);

  const analysisResult = `
✅ Resume Analyzed Successfully!
📄 File Name: ${fileName}
📦 Size: ${fileSizeKB} KB
🧠 Analysis: This is a dummy analysis. You can plug in OpenAI API or custom logic here.
  `.trim();

  res.json({ result: analysisResult });
});



