import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "./book.controller";

export const bookRoute = Router();

bookRoute.post("/books", createBook);
bookRoute.get("/books", getBooks);
bookRoute.get("/books/:bookId", getBookById);
bookRoute.patch("/books/:bookId", updateBook);
bookRoute.delete("/books/:bookId", deleteBook);
