import { Request, Response } from "express";
import { Book } from "../book/book.model";
import { Borrow } from "./borrow.model";

// create borrow
export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ message: `Book ID: ${bookId} does not exist` });
    }

    if (quantity > book.copies) {
      return res.status(400).json({
        message: `Only ${book.copies} copies are available, you borrow ${quantity} copy`,
      });
    }

    // update book stock
    const previousCopies = await book.updateStock(quantity);

    // create borrow
    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Something wrong",
      error: error.message | error,
    });
  }
};

// borrow books Summary
export const borrowBooksSummary = async (req: Request, res: Response) => {
  try {
    const borrowSummary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowSummary,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something Wrong",
      error,
    });
  }
};
