import { Router } from 'express';
import { changePassword, deleteAccount, userLogin, userSignup } from '../controller/userController.js';

const userRoutes = Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/login', userLogin);
userRoutes.put('/update/:userId', changePassword);
userRoutes.delete('/delete/:userId', deleteAccount);

export default userRoutes;