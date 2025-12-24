const razorpay = require('../utils/razorpay')

exports.CreateOrder = async (req, res) => {
  try {
    const { amount } = req.body
    console.log(req.body)

    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    }

    const order = await razorpay.orders.create(options)

    res.json({
      success: true,
      order
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Order creation failed' })
  }
}
