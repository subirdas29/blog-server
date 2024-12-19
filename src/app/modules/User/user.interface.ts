import { Model } from "mongoose";
import { USER_ROLES } from "./user.constant";

export interface TUser{
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updateAt: Date;
};


export interface UserModel extends Model<TUser>{
    isThePasswordMatched(plainTextPassword:string,hashPassword:string):Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLES