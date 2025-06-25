import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  updateStock: (quantity: number) => Promise<number>;
}

export interface BookStaticMethods extends Model<IBook> {
  findByGenre(genre: string): Promise<IBook[]>;
}
