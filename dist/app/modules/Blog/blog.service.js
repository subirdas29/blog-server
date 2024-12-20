"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const blog_model_1 = require("./blog.model");
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const createBlog = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = token;
    const authorData = yield user_model_1.User.isUserExist(email);
    if (!authorData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The user is not found");
    }
    const authorBlog = Object.assign({}, payload);
    authorBlog.author = authorData._id;
    const result = yield (yield blog_model_1.Blog.create(authorBlog)).populate('author');
    return result;
});
const updateOwnBlogByUser = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = token;
    const user = yield user_model_1.User.isUserExist(email);
    const author = yield blog_model_1.Blog.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The user is not found");
    }
    if (!(user._id.toString() === (author === null || author === void 0 ? void 0 : author.author.toString()))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can not update this blog, Because you are not author this blog");
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true }).populate('author');
    return result;
});
const deleteOwnBlogByUser = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = token;
    const user = yield user_model_1.User.isUserExist(email);
    const author = yield blog_model_1.Blog.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The user is not found");
    }
    if (!(user._id.toString() === (author === null || author === void 0 ? void 0 : author.author.toString()))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can not delete this blog, Because you are not author this blog");
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
const getAllBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('author'), query).search(blog_constant_1.blogSearchFields).sortBy().sortOrder().filter();
    const result = blogQuery.modelQuery;
    return result;
});
exports.BlogServices = {
    createBlog,
    updateOwnBlogByUser,
    deleteOwnBlogByUser,
    getAllBlog,
};
