# Blogging Platform Backend

## Overview

The **Blogging Platform Backend** is a RESTful API service for managing blogs. Users can register, authenticate, and manage their blogs, while admins can oversee the platform by moderating users and content. The backend is designed with security, scalability, and developer-friendly practices in mind.

> **Live URL**: https://blog-server-orpin.vercel.app/

---

## Features

### **1. User Roles**
- **Admin**:
  - Can delete any blog.
  - Can block/unblock users.
  - Cannot update blog content.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their blogs.
  - Cannot access admin functionalities.

---

### **2. Authentication & Authorization**
- **JWT-Based Authentication**:
  - Secure login system for protected routes.
- **Role-Based Access Control**:
  - Admins and users have specific privileges.

---

### **3. Public API**
- View all blogs without authentication.
- Features include:
  - **Search**: Find blogs by keywords in the title or content.
  - **Sort**: Sort blogs by title or creation date.
  - **Filter**: Filter blogs by author or published status.

---

### **4. User Operations**
- Authenticated users can:
  - Create blogs.
  - Edit their blogs.
  - Delete their blogs.

---

### **5. Admin Operations**
- Authenticated admins can:
  - Block/unblock users.
  - Delete any blog on the platform.

---

## Technologies Used

- **Programming Language**: TypeScript  
- **Runtime Environment**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JSON Web Tokens (JWT)  
- **Validation**: Zod for input validation  

---

## API Endpoints

### **Authentication**
| Endpoint               | Method | Description                   |
|------------------------|--------|-------------------------------|
| `/api/auth/register`   | POST   | Register a new user           |
| `/api/auth/login`      | POST   | Log in and receive JWT token  |

### **Blog Management**
| Endpoint               | Method | Description                          |
|------------------------|--------|--------------------------------------|
| `/api/blogs`           | POST   | Create a new blog (authenticated users) |
| `/api/blogs`           | GET    | View all blogs (public)              |
| `/api/blogs/:id`       | GET    | View a specific blog by ID (public)  |
| `/api/blogs/:id`       | PATCH  | Update a blog (owner only)           |
| `/api/blogs/:id`       | DELETE | Delete a blog (owner only)           |

### **Admin Actions**
| Endpoint                       | Method | Description                        |
|--------------------------------|--------|------------------------------------|
| `/api/admin/users/:userId/block` | PATCH  | Block a user (admin only)          |
| `/api/admin/users/:userId/unblock` | PATCH  | Unblock a user (admin only)        |
| `/api/admin/blogs/:id`         | DELETE | Delete any blog (admin only)       |

---
