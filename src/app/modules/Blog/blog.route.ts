import express from 'express';
import { BlogController } from './blog.controller';
// import { USER_ROLES } from '../User/user.constant';
// import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/', BlogController.createBlogController);
router.get('/', BlogController.getAllBlogController);

export const BlogRoutes = router;
