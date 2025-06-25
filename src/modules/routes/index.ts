import { Router } from "express";
import { bookRoute } from "../book/book.route";
import { borrowRoute } from "../borrow/borrow.route";

const routes = Router();

routes.use(bookRoute);
routes.use(borrowRoute);

export default routes;
