import { createBook, deleteBook, getBook, getBooks, patchBook } from "../controllers/Book.js";
import { authorizeWithPermissions } from "../middleware/Auth.js";
import { Router } from 'express';
const { respondWithError, throwCustomError } = require('../utils/FunctionsResponses');


const router = Router();

// Used only for specific book searches
async function getBookById(req, res) {
    try {
        // Call the controller with the book ID
        const searchResults = await getBook(req.params);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

// Used only for filtered book searches
async function getBooksHandler(req, res) {
    try {
        // Call the controller with the query filters
        const searchResults = await getBooks(req.query);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        console.error("Error occurred while fetching books:", e); // Optional: Add error logging
        respondWithError(res, e);  // Delegate error response
    }
}

// Does not require authentication
async function createBookHandler(req, res) {
    try {
        // Call the controller with the provided data
        await createBook(req.body);

        res.status(200).json({
            message: "Book successfully created. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

// Requires authentication below this line
async function updateBookHandler(req, res) {
    try {
        // Call the controller with the provided data
        const data = { _id: req.params._id, ...req.body };
        await patchBook(data);
        res.status(200).json({
            message: "Book successfully updated. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function deleteBookHandler(req, res) {
    try {
        // Call the controller with the book ID
        await deleteBook(req.params._id);

        res.status(200).json({
            message: "Book successfully deleted. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}


router.get('/', getBooksHandler);  
router.get('/:_id', getBookById);

router.post('/create', authorizeWithPermissions(["createBooks"]),createBookHandler);
router.patch('/:_id', authorizeWithPermissions(["editBooks"]), updateBookHandler);
router.delete('/:_id', authorizeWithPermissions(["deleteBooks"]), deleteBookHandler);

export default router;