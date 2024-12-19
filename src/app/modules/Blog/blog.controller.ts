import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlogController = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created successfully',
    data: result,
  });
});
const getAllBlogController = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlog();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved successfully',
    data: result,
  });
});

export const BlogController = {
  createBlogController,
  getAllBlogController
};
