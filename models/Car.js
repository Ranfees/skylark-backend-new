const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    id: String,
    name: String,
    model: String,
    category:String,
    transmission: String,
    fuel: String,
    price: Number,
    safetyRating:String,
    description:String,
    features:[String],
    images: [
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],    
    status:String,
    seats: Number

},
{
    timestamps: true   
  }
);

module.exports = mongoose.model('Car', carSchema);

