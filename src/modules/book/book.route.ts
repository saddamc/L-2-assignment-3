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
bookRoute.get("/books/:id", getBookById);
bookRoute.patch("/books/:id", updateBook);
bookRoute.delete("/books/:id", deleteBook);
