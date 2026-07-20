import Review from '../models/review.js';

export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.create({
    productId: req.params.productId,
    userId: req.user.id,
    userName: req.user.email, 
    rating,
    comment
  });
  res.status(201).json(review);
};

export const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
  res.json(reviews);
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    
    if (review && review.userId === req.user.id) {
      await review.deleteOne();
      res.json({ message: "Review deleted" });
    } else {
      res.status(403).json({ error: "Not authorized to delete this review" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};