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
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLES.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.blogSchema), blog_controller_1.BlogController.createBlogController);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLES.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogSchema), blog_controller_1.BlogController.updateOwnBlogController);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLES.user), blog_controller_1.BlogController.deleteOwnBlogController);
router.get('/', blog_controller_1.BlogController.getAllBlogController);
exports.BlogRoutes = router;
