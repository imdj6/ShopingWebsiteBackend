const Review = require("../../models/Review");
const Product=require("../../models/Product")
const User=require('../../models/User')
const ReviewServices = {
    createReview: async (userId,reviewData) => {
        try {
            // Validate that the product ID exists
            const product = await Product.findById(reviewData.productId);
            if (!product) {
                throw new Error('Product not found');
            }
            if (reviewData.rating < 1 || reviewData.rating > 5) {
                throw new Error('Rating must be between 1 and 5');
            }

            // Create the review
            const review = new Review({
                user: userId,
                product: reviewData.productId,
                rating: reviewData.rating,
                comment: reviewData.comment
            });

            // Save the review
            await review.save();

            await User.findByIdAndUpdate(userId, { $push: { reviews: review._id } });
            await Product.findByIdAndUpdate(reviewData.productId, { $push: { reviews: review._id } });

            return review;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ReviewServices;