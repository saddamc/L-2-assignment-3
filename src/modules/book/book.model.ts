import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookStaticMethods>(
  {
    title: {
      type: String,
      required: [true, "Title is missing"],
    },
    author: {
      type: String,
      required: [true, "Author is missing"],
    },
    genre: {
      type: String,
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "genre is not valid. got {VALUE} genre",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies are required"],
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer value",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static("findByGenre", async function (genre: string) {
  const findGenre = await this.find({ genre });
  return findGenre;
});

// middleware => pre
bookSchema.pre("save", function (next) {
  console.log("Book:", this.title);
  next();
});

// Query Middleware
bookSchema.pre("find", function (next) {
  console.log("Search book:", this.getQuery);
  next();
});

bookSchema.post("save", function (doc, next) {
  console.log(`${doc.title} has been saved`);
  next();
});

bookSchema.method("updateStock", async function (quantity: number) {
  this.copies -= quantity;
  this.available = this.copies <= 0 ? false : true;
  await this.save();
});

export const Book = model<IBook, BookStaticMethods>("Book", bookSchema);
