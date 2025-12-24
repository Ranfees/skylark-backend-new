const CarReview = require('../models/CarReview');

exports.AddCarReview = async (req, res) => {
    try {
        console.log(req.body)
        const review = await CarReview.create({
            id: Date.now(),
            userid: req.body.userId,
            rating: req.body.rating,
            text: req.body.text,
            carid: req.body.carId,
        });
       
        res.status(201).json({ data: review });
    } catch (e) {
        console.log("error while adding review")
        console.log(e)
        return res.status(500).json({
            message: "car review add failed"
        })
    }
}

exports.GetCarReviews = async (req, res) => {
    try {
        const { carid } = req.params;

        const reviews = await CarReview.find({ carid })
            .sort({ createdAt: -1 });

        res.json({ data: reviews });

    } catch (e) {
        console.error("error fetching reviews", e);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};

exports.GetCarReviewSummary = async (req, res) => {
    try {
        const { carid } = req.params;

        const reviews = await CarReview.find({ carid });

        const totalReviews = reviews.length;

        const averageRating =
            totalReviews === 0
                ? 0
                : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

        res.json({
            data: {
                totalReviews,
                averageRating: Number(averageRating.toFixed(1)),
                reviews
            }
        });

    } catch (e) {
        console.error("summary error", e);
        res.status(500).json({ message: "Failed to get review summary" });
    }
};
