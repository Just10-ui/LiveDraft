import { Router } from 'express';
import { changePassword, userLogin, userSignup } from '../controller/userController.js';

const userRoutes = Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);
userRoutes.put('/:userId', changePassword);

export default userRoutes;