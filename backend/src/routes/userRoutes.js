import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.get('/profile', protect, (req, res) => {
    
    res.json({ 
        message: "You are logged in and accessing protected data!", 
        userData: req.user 
    });
});

export default router;