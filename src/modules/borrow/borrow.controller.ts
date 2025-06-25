import { Request, Response } from "express";
import { Book } from "../book/book.model";
import { Borrow } from "./borrow.model";

// create borrow
export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    // console.log(req.body);
    const foundBook = await Book.findById(book);
    // console.log("book:", book);
    if (!foundBook) {
      return res
        .status(404)
        .json({ message: `Book ID: ${book} does not exist` });
    }

    if (quantity > foundBook.copies) {
      return res.status(400).json({
        message: `Only ${foundBook.copies} copies are available, you borrow ${quantity} copy`,
      });
    }

    // update book stock
    const previousCopies = await foundBook.updateStock(quantity);

    // create borrow
    const borrow = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something wrong",
      error: error?.message | error,
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
