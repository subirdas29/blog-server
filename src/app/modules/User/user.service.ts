import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser =async(payload:TUser)=>{
    const result = await User.create(payload)
    return result
}

const getAllUser = async()=>{
    const result = await User.find()
    return result
}

export const UserServices = {
    createUser,
    getAllUser
}