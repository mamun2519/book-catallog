# Book Catalog Backend

This Backend use express, typeScript, Postgress and Prisma.

## Live Link

https://book-categlog-backend.vercel.app/

# API EndPoint

## User

- https://book-categlog-backend.vercel.app/api/v1/auth/signup (POST)
- https://book-categlog-backend.vercel.app/api/v1/auth/signin (POST)
- https://book-categlog-backend.vercel.app/api/v1/users (GET)
- https://book-categlog-backend.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET)
- https://book-categlog-backend.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
- https://book-categlog-backend.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE)
- https://book-categlog-backend.vercel.app/api/v1/profile (GET)

## Category

- https://book-categlog-backend.vercel.app/api/v1/categories/create-category (POST)
- https://book-categlog-backend.vercel.app/api/v1/categories (GET)
- https://book-categlog-backend.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET)
- https://book-categlog-backend.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
- https://book-categlog-backend.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) I

## Books

- https://book-categlog-backend.vercel.app/api/v1/books/create-book (POST)
- https://book-categlog-backend.vercel.app/api/v1/books (GET)
- https://book-categlog-backend.vercel.app/api/v1/books/:categoryId/category (GET)
- https://book-categlog-backend.vercel.app/api/v1/books/:id (GET)
- https://book-categlog-backend.vercel.app/api/v1/books/:id (PATCH)
- https://book-categlog-backend.vercel.app/api/v1/books/:id (DELETE)

## Orders

- https://book-categlog-backend.vercel.app/api/v1/orders/create-order (POST)
- https://book-categlog-backend.vercel.app/api/v1/orders (GET)
- https://book-categlog-backend.vercel.app/api/v1/orders/:orderId (GET)
