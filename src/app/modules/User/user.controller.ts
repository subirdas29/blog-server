import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import config from '../../config';

const registerUserController = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);

  const {_id,name,email} = result;

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: httpStatus.CREATED,
    data: {
      _id,
      name,
      email
    },
  });
});


const getAllUserController = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});


const loginUser = catchAsync(async(req,res)=>{
  const result = await UserServices.loginUser(req.body)

  const {refreshToken,token} = result

  res.cookie('refreshToken',refreshToken,{
      secure:config.NODE_ENV === "production",
      httpOnly:true
  })

  sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Login successful",
      data:{
          token
      }
  })
})

const refreshToken = catchAsync(async(req,res)=>{
  const {refreshToken} = req.cookies
  const result = await UserServices.refreshToken(refreshToken)

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access Token is retrieved successfully!',
      data: result
    });
})

const blockUserByAdminController = catchAsync(async (req, res) => {

  const {userId} = req.params
  
await UserServices.blockUserByAdmin(userId);
  res.status(httpStatus.OK).json({
   success: true,
   message: "User blocked successfully",
   statusCode: httpStatus.OK
   });
});


const deleteBlogByAdminController = catchAsync(async (req, res) => {

  const {id} = req.params
  
  await UserServices.deleteBlogByAdmin(id);

  res.status(httpStatus.OK).json({
  success: true,
  message: "Blog deleted successfully",
  statusCode: httpStatus.OK
  });
});

export const UserController = {
  registerUserController,
  getAllUserController,
  loginUser,
  refreshToken,
  blockUserByAdminController,
  deleteBlogByAdminController
};
