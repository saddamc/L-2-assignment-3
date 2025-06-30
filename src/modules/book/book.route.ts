import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "./book.controller";

export const bookRoute = Router();

bookRoute.post("/api/books", createBook);
bookRoute.get("/api/books", getBooks);
bookRoute.get("/api/books/:id", getBookById);
bookRoute.patch("/api/books/:id", updateBook);
bookRoute.delete("/api/books/:id", deleteBook);
