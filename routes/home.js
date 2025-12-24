const express = require('express')
const { GetHomePage, GetCarsPage, GetCar, GetBookingsPage, CreateBooking, GetBookingsDetails, UpdateUserProfile } = require('../controllers/home')
const { GetAllCars } = require('../controllers/admin')
const { CreateOrder } = require('../controllers/payment')
const { getTestimonials,addTestimonial } = require('../controllers/testimonial')
const router = express.Router()


router
    .route('/profile')
    .get(GetHomePage)
router
    .route('/getcar/:id')
    .get(GetCar)

router
    .route('/bookings')
    .get(GetBookingsPage)
    .post(CreateBooking)
router
    .route('/cars')
    .get(GetAllCars)

router
    .route('/bookings/:userId')
    .get(GetBookingsDetails)
router
    .route("/users/:id")
    .put(UpdateUserProfile)
router
    .route('/create-order')
    .post(CreateOrder)
    router.get('/testimonials', getTestimonials)
    router.post('/testimonials', addTestimonial)
    

module.exports = router