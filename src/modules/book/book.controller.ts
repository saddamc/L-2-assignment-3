import { Request, Response } from "express";
import { z } from "zod";
import { Book } from "./book.model";

const CreatedBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string().optional(),
  isbn: z.string(),
  description: z.string(),
  copies: z.number(),
  available: z.boolean(),
});

// create book
export const createBook = async (req: Request, res: Response) => {
  try {
    const body = await CreatedBookZodSchema.parseAsync(req.body);

    const book = new Book(body);
    const data = await book.save();

    res.status(201).json({
      success: true,
      message: "Book Created successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something Wrong",
      error,
    });
  }
};

// get Books with filter
export const getBooks = async (req: Request, res: Response) => {
  // const books = await Book.find();
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query = filter ? { genre: filter.toString().toUpperCase() } : {};

    const data = await Book.find(query)
      .sort({ [sortBy as any]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));
    // const books = await Book.findByGenre("");

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something Wrong",
      error,
    });
  }
};

// get book by id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const data = await Book.findById(bookId);

    res.status(201).json({
      success: true,
      message: "Book retrived successfuly",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something Wrong",
      error,
    });
  }
};

// Update Book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    // update
    const updatedBody = req.body;
    const data = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something Wrong",
      error,
    });
  }
};

// Delete Book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const data = await Book.findOneAndDelete({ _id: bookId });

    res.status(201).json({
      success: true,
      message: "User Deleted successfuly",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something Wrong",
      error,
    });
  }
};
