const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Report Issue
router.post('/', async (req, res) => {
  const newIssue = new Issue(req.body);
  try {
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;