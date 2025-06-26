import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "books", required: true },
    quantity: {
      type: Number,
      required: [true, "Quantity is missing"],
      min: [1, "Borrow at least one copy"],
    },
    dueDate: { type: Date, required: [true, "Due Date is missing"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// middleware
borrowSchema.post("save", function (doc, next) {
  console.log(`${doc.quantity} book added in Borrow`);
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
