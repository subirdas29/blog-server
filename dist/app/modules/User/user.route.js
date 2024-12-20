"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/register', user_controller_1.UserController.registerUserController);
router.post('/login', user_controller_1.UserController.loginUser);
router.get('/', user_controller_1.UserController.getAllUserController);
router.post('/refresh-token', user_controller_1.UserController.refreshToken);
exports.UserRoutes = router;
