const ReviewServices = require("../../services/Reviews");

const ReviewCntrl = {
    createreview: async (req, res, next) => {
        try {
            const userId = req.user._id; // Assuming userId is stored in req.user after authentication
            const reviewData = req.body;

            // Call service method to create the review
            const review = await ReviewServices.createReview(userId, reviewData);

            res.status(201).json({ message: 'Review created successfully', review });
        } catch (error) {
            next(error);
        }
    },
    deleteReviewById: async (req,res) => {
        try {
            const reviewId = req.params.id;
            const userId = req.user._id;
            const result = await ReviewServices.deleteReviewById(reviewId, userId);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error deleting review:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = ReviewCntrl;