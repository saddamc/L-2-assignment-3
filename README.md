# Library Management System

A Library Management System built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This API allows for book inventory tracking and borrowing, including availability checks, schema validation, filtering, and more.

---

## Features

- ✅ Start with make: interface
- ✅ Schema, mongoose Schema validation
- ✅ Zod validation
- ✅ availability filtering => ?filter=BIOGRAPHY, limit=1, ?filter=BIOGRAPHY&limit=1 , sort=desc
- ✅ Book find by id
- ✅ update book by id
- ✅ Delete book by id
- ✅ Middleware: bookSchema & borrowSchema
- ✅ Aggregate: borrow summary 👍my favourite
- ✅ Borrow quantity reduces availability

---

## ⚙️ Route API

    ☼ bookRoute.post("/books", createBook);
    ☼ bookRoute.get("/books", getBooks);
    ☼ bookRoute.get("/books/:id", getBookById);
    ☼ bookRoute.patch("/books/:id", updateBook);
    ☼ bookRoute.delete("/books/:id", deleteBook);

    ☼ borrowRoute.post("/borrow", createBorrow);
    ☼ borrowRoute.get("/borrow/summary", borrowBooksSummary);

## Technologies Used

- Node.js + Express
- TypeScript
- MongoDB + Mongoose + MongoDB Compass
- dotenv, nodemon,
- Zod
- postman for api feature checking

---

## Installation & Setup

```bash
    - npm i express mongoose cors
    - npm i --save-dev @types/express
    - npm i --save-dev @types/cors
    - npm i ts-node-dev
    - npm init -y	    => package.json
    - npm i -g typescript
    - tsc --init		=> tsconfig.json
    - npm i zod
```

### GitHub Link:

```bash
https://github.com/saddamc/L-2-assignment-3
```
