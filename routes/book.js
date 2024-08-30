import express from 'express';
import bookController from '../controllers/bookController.js';

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/:bookId", bookController.getBookById);
router.post("/addBook", bookController.addBook);
router.put("/update-book/:bookId", bookController.updateBook);
router.delete("/delete-book/:bookId", bookController.deleteBook);

export { router as bookRoute }