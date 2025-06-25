import { Router } from "express";
import { borrowBooksSummary, createBorrow } from "./borrow.controller";

export const borrowRoute = Router();

borrowRoute.post("/borrow", createBorrow);
borrowRoute.get("/borrow", borrowBooksSummary);
