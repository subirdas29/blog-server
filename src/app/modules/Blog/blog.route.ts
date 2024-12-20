import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../User/user.constant';



const router = express.Router();

router.post('/', BlogController.createBlogController);
router.get('/',auth(USER_ROLES.admin), BlogController.getAllBlogController);

export const BlogRoutes = router;
