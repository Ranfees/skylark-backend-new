const mongoose = require('mongoose');

const maintenenceSchema = new mongoose.Schema({
    id:String,
    carid:String,
    Maintenencetype:String,
    Maintenencedescription:String,
    price:Number,
    
},
{
    timestamps: true   
}
);

module.exports =  mongoose.model('Maintenence', maintenenceSchema);