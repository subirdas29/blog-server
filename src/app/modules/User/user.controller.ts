import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUserController = catchAsync(async(req,res)=>{
    const result = await UserServices.createUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created successfully',
        data: result,
      });
})


const getAllUserController = catchAsync(async(req,res)=>{
    const result = await UserServices.getAllUser()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created successfully',
        data: result,
      });
})

export const UserController = {
    createUserController,
    getAllUserController
}