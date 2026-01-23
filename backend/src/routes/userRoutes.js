import { Router } from 'express';
import { verifyToken } from '../middleware/middleware.js';
import { login, signup, userProfile } from '../controller/userController.js';

const userRoutes = Router();

userRoutes.post('/signup', signup);
userRoutes.post('/login', login);
userRoutes.get('/profile', verifyToken, userProfile);

export default userRoutes;