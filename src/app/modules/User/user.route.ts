import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { USER_ROLES } from './user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/register',validationRequest(userValidation.registerValidationSchema), UserController.registerUserController);
router.post('/login',validationRequest(userValidation.loginValidationSchema),UserController.loginUser,);
router.post('/refresh-token',validationRequest(userValidation.refreshTokenValidationSchema), UserController.refreshToken,);
router.get('/', UserController.getAllUserController);


router.patch('/users/:userId/block',auth(USER_ROLES.admin), UserController.blockUserByAdminController);

router.delete('/blogs/:id',auth(USER_ROLES.admin), UserController.deleteBlogByAdminController);

export const UserRoutes = router;
