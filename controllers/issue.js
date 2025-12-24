const Issue = require('../models/Issue')

exports.CreateIssue = async (req, res) => {
    try {
      const issue = await Issue.create(req.body)
      res.status(201).json({ message: 'Issue reported', issue })
    } catch (err) {
      res.status(500).json({ message: 'Server error' })
    }
  }
  exports.GetAllIssues = async (req, res) => {
    const issues = await Issue.find().sort({ createdAt: -1 })
    res.json(issues)
  }
  
  exports.UpdateIssueStatus = async (req, res) => {
    const { status } = req.body
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(issue)
  }