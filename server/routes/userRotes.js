import express from 'express';
import { acceptConnectionRequest, discoverUsers, followUser, getUserConnections, getUserData, getUserProfiles, sendConnectionRequest, unfollowUser, updateUserData } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../configs/multer.js';
import { getUserRecentMessages } from '../controllers/messageController.js';

const userRouter = express.Router();

userRouter.get('/data', protect, getUserData)
userRouter.post('/update', upload.fields([{name: 'profile', maxCount: 1}, {name: 'cover', maxCount: 1}]), protect, updateUserData)
userRouter.post('/discover', protect, discoverUsers)
userRouter.post('/follow', protect, followUser)
userRouter.post('/unfollow', protect, unfollowUser)
userRouter.post('/connect', protect, sendConnectionRequest)
userRouter.post('/accept', protect, acceptConnectionRequest)
userRouter.get('/connections', protect, getUserConnections)
userRouter.post('/profiles', getUserProfiles)
userRouter.get('/recent-messages', protect, getUserRecentMessages)

// Debug route: echoes request origin/headers (no auth)
userRouter.get('/debug', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    ok: true,
    origin: req.headers.origin || null,
    host: req.headers.host || null,
    headers: req.headers
  });
});

export default userRouter
