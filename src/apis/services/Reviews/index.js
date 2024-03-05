const Review = require("../../models/Review");
const Product = require("../../models/Product")
const User = require('../../models/User')
const ReviewServices = {
    createReview: async (userId, reviewData) => {
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
    },
    deleteReviewById: async (reviewId, userId) => {
        try {
            console.log(userId)
            // Find the review by ID and check if it exists
            const review = await Review.findById(reviewId);
            if (!review) {
                return { success: false, message: "Review not found." };
            }
            if (userId.toString() !== review.user.toString()) {
                return { success: false, message: "Forbidden: You don't have permission to delete this review." };
            }
            // Delete the review from the product
            await Product.updateOne({ _id: review.product }, { $pull: { reviews: review._id } });

            // Delete the review from the user
            await User.updateOne({ _id: review.user }, { $pull: { reviews: review._id } });
            await Review.findByIdAndDelete(reviewId);

            return { success: true, message: "Review deleted successfully." };
        } catch (error) {
            console.error("Error deleting review:", error);
            throw new Error("Internal server error.");
        }
    }
};

module.exports = ReviewServices;