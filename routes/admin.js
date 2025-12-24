const express = require('express')
const { Dashboard, AddCar, DeleteCar, GetAllUsers, UpdateCar, UpdateUser, DeleteUser, GetTotalSummary, GetCarCategoryStats, GetMonthlyBookings, GetMonthlyRevenue, GetMonthlyUserGrowth } = require('../controllers/admin')
const router = express.Router()


router
    .route('/admin')
    .get(Dashboard)
router
    .route('/addcar')
    .post(AddCar)

router
    .route('/deletecar/:id')
    .delete(DeleteCar)

router
    .route('/users')
    .get(GetAllUsers)

router
    .route('/cars/:id')
    .put(UpdateCar)

router
    .route('/admin/users/:id')
    .put(UpdateUser)
router
    .route('/admin/users/:id')
    .delete(DeleteUser)
router
    .route('/totalsummary')
    .get(GetTotalSummary)
router
    .route('/admin/car-category-stats')
    .get(GetCarCategoryStats)
router
    .route('/admin/monthly-bookings')
    .get(GetMonthlyBookings)
router
    .route('/admin/monthly-revenue')
    .get(GetMonthlyRevenue)
router
    .route('/admin/monthly-users')
    .get(GetMonthlyUserGrowth)




module.exports = router