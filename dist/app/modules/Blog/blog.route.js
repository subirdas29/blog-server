"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/', blog_controller_1.BlogController.createBlogController);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLES.admin), blog_controller_1.BlogController.getAllBlogController);
exports.BlogRoutes = router;
