import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import {  TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken"
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async(payload:TLoginUser)=>{

    const user = await User.findOne({
        email: payload?.email,
    })

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found !')
    }

    if(user?.isBlocked===true){
        throw new AppError(httpStatus.FORBIDDEN,"This user is Blocked")
    }

    if(!(User.isThePasswordMatched(payload?.password,user?.password))){
        throw new AppError(httpStatus.FORBIDDEN,"password do not match")
    }
 
    const jwtPayload  = {
        email:user?.email,
        role:user?.role,
    }

    const accessToken= createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expires_in as string)
    
    const refreshToken= createToken(jwtPayload,config.jwt_refresh_secret as string,config.jwt_refresh_expires_in as string)
    

    return {
        accessToken,
        refreshToken,   
    }

}


const refreshToken = async(token:string)=>{
    if(!token){
      throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized")
  }
  
  const decoded = jwt.verify(token,config.jwt_refresh_secret as string) as JwtPayload
  
  
  const {email} = decoded
  
  const user = await User.findOne({email});
      
  
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

export const AuthServices = {
    loginUser,
    refreshToken
}