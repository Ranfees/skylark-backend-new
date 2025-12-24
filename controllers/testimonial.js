
const Testimonial = require('../models/Testimonial')

exports.getTestimonials = async (req, res) => {
  const data = await Testimonial.find().sort({ createdAt: -1 }).limit(3)
  res.json({ success: true, data })
}
exports.addTestimonial = async (req, res) => {
    let { name, message, rating,avatar } = req.body
    avatar = avatar || `https://i.pravatar.cc/90?u=${name}`
  
    const testimonial = await Testimonial.create({
      name,
      message,
      rating,
      avatar
    })
  
    res.json({ success: true, testimonial })
  }
  