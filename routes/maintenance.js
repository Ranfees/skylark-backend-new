const express = require('express')
const router = express.Router()
const { AddMaintenance, GetCarMaintenance} = require('../controllers/maintenance')

router
    .route('/maintenance')
    .post(AddMaintenance)
router
    .route('/maintenance/:carid')
    .get(GetCarMaintenance)


module.exports = router