const mongoose = require('mongoose');

const carReviewSchema = new mongoose.Schema({
    id:String,
    userid:String,
    rating:Number,
    text:String,
    carid:String,
},
  { timestamps: true }
);

module.exports =  mongoose.model('carReview', carReviewSchema);