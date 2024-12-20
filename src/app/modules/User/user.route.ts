import express from 'express';
import { UserController } from './user.controller';


const router = express.Router();

router.post('/register', UserController.registerUserController);
router.post('/login',UserController.loginUser,);
router.get('/', UserController.getAllUserController);
router.post('/refresh-token', UserController.refreshToken,);

export const UserRoutes = router;
