
import { NextFunction, Request, Response } from 'express';
import catchAsync from "../utils/catchAsync"
import config from "../config"
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../modules/User/user.model"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import { TUserRole } from "../modules/User/user.interface"


const auth= (...requiredRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        
        const BearerToken:string = `Bearer ${req.headers.authorization}`
        const splitToken:string[] = BearerToken.split(' ')
        const token = splitToken[1]


        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized")
        }        

        const decoded =jwt.verify(token,config.jwt_access_secret as string) as JwtPayload

        const {email,role} = decoded

        const user = await User.findOne({email})

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
          }

          if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED,"Invalid credentials")
           }
          

          req.user = decoded as JwtPayload

          
           next()

    })
}

export default auth;