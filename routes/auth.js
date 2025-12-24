const express = require('express')
const router = express.Router()

const {Login, Logout, Register,GenerateOtp,VerifyOtp } = require('../controllers/auth')


router
    .route('/login')
    .post(Login)
router
    .route('/generateotp')
    .post(GenerateOtp)
router
    .route('/loginwithotp')
    .post(VerifyOtp)
router
    .route('/register')
    .post(Register)

router
    .route('/logout')
    .get(Logout)

module.exports = router