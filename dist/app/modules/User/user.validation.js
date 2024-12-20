"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, { message: "Name is required" }),
        email: zod_1.z
            .string()
            .email({ message: "Invalid email address" }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z
            .enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" })
            .optional(),
        isBlocked: zod_1.z
            .boolean()
            .optional(),
    })
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.userValidation = {
    registerValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema
};
