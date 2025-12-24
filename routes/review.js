
const express = require('express');
const {
    AddCarReview,
    GetCarReviews,
    GetCarReviewSummary,
} = require('../controllers/review');

const router = express.Router();

router.post('/addcarreview', AddCarReview);
router.get('/reviews/:carid', GetCarReviews);
router.get('/reviews-summary/:carid', GetCarReviewSummary);


module.exports = router;
