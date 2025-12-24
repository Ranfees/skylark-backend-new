const Razorpay = require('razorpay')

try{
const razorpay = new Razorpay({
    key_id:process.env.PAY_ID,
    key_secret:process.env.PAY_SECRET
  })
  module.exports = razorpay

}catch(e){
  console.log("error while creating  new key:", e)
}
