import { Router } from 'express';
import { userLogin, userSignup } from '../controller/userController.js';

const userRoutes = Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);

export default userRoutes;