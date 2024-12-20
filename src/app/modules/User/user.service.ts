import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from './user.utils';
import { Blog } from '../Blog/blog.model';

const registerUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const loginUser = async(payload:TLoginUser)=>{

  const user = await User.isUserExist(payload.email)

  if(!user){
      throw new AppError(httpStatus.NOT_FOUND,'This user is not found !')
  }

  if(user?.isBlocked===true){
      throw new AppError(httpStatus.FORBIDDEN,"This user is Blocked")
  }

  if(!(await User.isThePasswordMatched(payload?.password,user?.password))){
      throw new AppError(httpStatus.FORBIDDEN,"password do not match")
  }

  const jwtPayload  = {
      email:user?.email,
      role:user?.role,
  }

  const token= createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expires_in as string)
  
  const refreshToken= createToken(jwtPayload,config.jwt_refresh_secret as string,config.jwt_refresh_expires_in as string)
  

  return {
      token,
      refreshToken,   
  }
}

const refreshToken = async(token:string)=>{
  if(!token){
    throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized")
}

const decoded = jwt.verify(token,config.jwt_refresh_secret as string) as JwtPayload


const {email} = decoded

const user = await User.isUserExist(email);
    

if (!user) {
  throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
}

const isUserBlocked = user?.isBlocked
if(isUserBlocked === true){
    throw new AppError(httpStatus.FORBIDDEN,"This user is blocked")
}

const jwtPayload  = {
  email:user?.email,
  role:user?.role,
}

 const accessToken = createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expires_in as string)

 return{
  accessToken,
 }

}


const blockUserByAdmin = async(id:string) =>{

  const user = await User.findById(id)

  if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"User not found!")
  }

  if(user.isBlocked === true){
    throw new AppError(httpStatus.BAD_REQUEST,"This user is already blocked!")
  }
  
  const result = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true})

  return result
}

const deleteBlogByAdmin = async (id:string) => {

  const blog = await Blog.findByIdAndDelete(id)

  if(!blog){
    throw new AppError(httpStatus.NOT_FOUND,"Blog not found")
  }

  const result = await Blog.findByIdAndUpdate(id)
  return result
}



export const UserServices = {
  registerUser,
  getAllUser,
  loginUser,
  refreshToken,
  blockUserByAdmin,
  deleteBlogByAdmin
};
