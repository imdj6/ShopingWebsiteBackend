const ReviewServices = require("../../services/Reviews");

const ReviewCntrl = {
    createreview: async (req,res,next) => {
        try {
            const userId = req.user._id; // Assuming userId is stored in req.user after authentication
            const reviewData = req.body;

            // Call service method to create the review
            const review = await ReviewServices.createReview(userId, reviewData);

            res.status(201).json({ message: 'Review created successfully', review });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ReviewCntrl;