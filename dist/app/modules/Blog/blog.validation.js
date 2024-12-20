"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
// Zod schema for validating blog data
const blogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title is required",
        }),
        content: zod_1.z
            .string({
            required_error: "Content is required",
        }),
    })
});
const updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title is required",
        }).optional(),
        content: zod_1.z
            .string({
            required_error: "Content is required",
        }).optional(),
    })
});
exports.BlogValidation = {
    blogSchema, updateBlogSchema
};
