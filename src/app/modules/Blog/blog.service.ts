import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchFields } from './blog.constant';

const createBlog = async (payload: TBlog,token:JwtPayload) => {
  const {email} = token
  const authorData = await User.isUserExist(email)

  if(!authorData){
    throw new AppError(httpStatus.NOT_FOUND,"The user is not found")
  }

  const authorBlog:Partial<TBlog> = {...payload}
  authorBlog.author = authorData._id

  const result = await (await Blog.create(authorBlog)).populate('author');

  return result;
};

const updateOwnBlogByUser = async(id:string,payload:TBlog,token:JwtPayload)=>{

  const {email} = token

  const user = await User.isUserExist(email)
  const author = await Blog.findById(id)

  if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"The user is not found")
  }
  if(!(user._id.toString()===author?.author.toString())){
    throw new AppError(httpStatus.UNAUTHORIZED,"You can not update this blog, Because you are not author this blog")
  }
  const result = await Blog.findByIdAndUpdate(id,payload,{new:true}).populate('author')
  return result;
}


const deleteOwnBlogByUser = async(id:string,token:JwtPayload)=>{

  const {email} = token
  const user = await User.isUserExist(email)
  const author = await Blog.findById(id)

  if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"The user is not found")
  }
  if(!(user._id.toString()===author?.author.toString())){
    throw new AppError(httpStatus.UNAUTHORIZED,"You can not delete this blog, Because you are not author this blog")
  }

  const result = await Blog.findByIdAndDelete(id)
  return result
}

const getAllBlog=async(query:Record<string,unknown>)=>{
  const blogQuery = new QueryBuilder(Blog.find().populate('author'),query).search(blogSearchFields).sortBy().sortOrder().filter()

  const result = blogQuery.modelQuery
  return result
}

export const BlogServices = {
  createBlog,
  updateOwnBlogByUser,
  deleteOwnBlogByUser,
  getAllBlog,
};
