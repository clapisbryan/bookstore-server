import { BookModel } from "../models/bookModel.js";
import auth from '../auth.js'

const { errorHandler } = auth

const getAllBooks = async (req, res) => {
	try {
		await BookModel.find({})
			.then(books => {
				return res.status(200).send({
					count: books.length,
					data: books
				})
			})
			.catch(err => {
				errorHandler(err, res)
			})
	} catch (error) {
		errorHandler(error, res)
	}
}

const getBookById = async (req, res) => {
	try {
		const { bookId } = req.params;

		await BookModel.findById(bookId)
			.then(book => {
				return res.status(200).send(book)
			})
			.catch(err => {
				errorHandler(err, res)
			})
	} catch (error) {
		errorHandler(error, res)
	}
}

const addBook = async (req, res) => {
	console.log(req.body);


	try {
		const { title, author, publishYear } = req.body;
		if (!title || !author || !publishYear) {
			return res.status(400).send({ message: 'title, author, publishYear is required' })
		}

		const newBook = new BookModel({
			title, author, publishYear
		})

		return newBook.save()
			.then(book => {
				return res.status(201).send(book)
			})
			.catch(err => {
				errorHandler(err, res)
			})
	} catch (error) {
		errorHandler(error, res)
	}
}

const updateBook = async (req, res) => {
	try {
		const id = req.params;
		console.log("bookId", id);

		const { title, author, publishYear } = req.body;

		if (!title || !author || !publishYear) {
			return res.status(400).send({ message: 'title, author, publishYear is required' })
		}

		const result = await BookModel.findByIdAndUpdate(id.bookId, { title, author, publishYear })
		console.log("result", result);

		if (!result) {
			return res.status(404).send({ message: 'Book not found' })
		}
		return res.status(200).send({ message: 'Book updated successfully' })

	} catch (error) {
		errorHandler(error, req, res);
	}
}

const deleteBook = async (req, res) => {
	try {
		const id = req.params;

		await BookModel.findByIdAndDelete(id.bookId)
			.then(book => {
				if (!book) {
					res.status(404).send({ message: "Book not found" })
				}
				res.status(200).send({ message: "Book deleted successfully" })
			})
			.catch(error => errorHandler(error, req, res));
	} catch (error) {
		errorHandler(error, req, res);
	}
}

export default {
	getAllBooks,
	getBookById,
	addBook,
	updateBook,
	deleteBook
}