import express from 'express';
import { UserController } from './user.controller';

const router = express.Router()

router.post('/register',UserController.createUserController)
router.get('/',UserController.getAllUserController)

export const UserRoutes = router;