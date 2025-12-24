const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    issueType: String,
    description: String,
    status:{
      type:String,
      default:'Open',
      enum:['Open','In Progress','Resolved']

    },
  }, { timestamps: true })
  
  module.exports = mongoose.model('Issue', issueSchema)
  