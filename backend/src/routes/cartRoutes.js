import express from 'express';
import { addToCart, getCart , removeFromCart, clearCart} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeFromCart);
router.delete('/', protect, clearCart);

export default router;