import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields';

const authRoutes = Router();

authRoutes.post('/login', [
    check('email', 'For login you must provide your email').notEmpty().isEmail(),
    check('password', 'For login you must provide your password').notEmpty(),
    validateFields
], signIn);

authRoutes.post('/register', [
    check('username', 'For register you must provide your username').notEmpty(),
    check('email', 'For register you must provide your email').notEmpty().isEmail(),
    check('password', 'For register you must provide your password').notEmpty(),
    validateFields
], signUp);


export default authRoutes;