const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  name: String,
  phone: String,
  mail: String,
  role: {
    type: String,
    default: "user"
  },
  password: String,
  hasbooking: Boolean,
  dp: String,
  otp: String
}, {
  timestamps: true  
});


userSchema.pre('save',async function(){

    if(!(this.isModified('password'))){
        return
    }

    this.password= await bcrypt.hash(this.password,10)
    return

})


userSchema.methods.isValidatedPassword = async function(userSendPassword){
    return await bcrypt.compare(userSendPassword,this.password)
}


userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {    
            id:this.id,
            name:this.name,
            role:this.role
        },
        process.env.JWT_SECRET,
        {expiresIn:'8h'}
    )
} 

module.exports =  mongoose.model('User', userSchema);