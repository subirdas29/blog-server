import { z } from 'zod';


const registerValidationSchema = z.object({
  body:z.object({
    name: z
    .string()
    .min(1, { message: "Name is required" }), 
  email: z
    .string()
    .email({ message: "Invalid email address" }), 
    password: z.string({ required_error: 'Password is required' }),
  role: z
    .enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" })
    .optional(), 
  isBlocked: z
    .boolean()
    .optional(), 
  })
});


const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid email address" }), 
      password: z.string({ required_error: 'Password is required' }),
    }),
  });

  const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });

export const userValidation = {
    registerValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema
  };