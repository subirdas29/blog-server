import { Model, Types } from "mongoose";
import { USER_ROLES } from "./user.constant";

export interface TUser{
  _id: Types.ObjectId; 
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updateAt: Date;
};

export type TLoginUser ={
  email : string,
  password:string,
}

export interface UserModel extends Model<TUser>{
    isThePasswordMatched(plainTextPassword:string,hashPassword:string):Promise<boolean>,
    isUserExist(id:string):Promise<TUser>,
}

export type TUserRole = keyof typeof USER_ROLES