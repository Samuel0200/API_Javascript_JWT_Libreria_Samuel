import { createBookMongo, getBookMongo, getBooksMongo, updateBookMongo, deleteBookMongo } from '../actions/Book';
import { throwCustomError } from '../utils/FunctionsResponses';

export async function getBook(query) {
    try {
        
        const filters = { ...query};
        const book = await getBookMongo(filters);
        if (!book) {
            // Usa throwCustomError si no se encuentra el libro
            throwCustomError(404, 'Book not found');
        }

        return book.toObject();
    } catch (e) {
        throw e;
    }
}

export async function getBooks(query) {
    try {

        const filters = { ...query, disabled: query.disabled ?? false };
        const filteredBookResults = await getBooksMongo(filters);
        if (!filteredBookResults) {
            // Usa throwCustomError si no se encuentran libros
            throwCustomError(404, 'Books not found');
        }

        return filteredBookResults;
    } catch (e) {
        throw e;
    }
}

export async function createBook(data) {
    try {
        const createdBook = await createBookMongo(data);
        return createdBook;
    } catch (e) {
        throw e;
    }
}

export async function patchBook(data) {
    try {
        
        const { _id, ...changes } = data;
        const updatedBook = await updateBookMongo(_id, changes);

        if (!updatedBook) {
            // Usa throwCustomError si no se encuentra el libro
            throwCustomError(404, 'Book not found');
        }
        return updatedBook;
    } catch (e) {
        throw e;
    }
}

export async function deleteBook(id) {
    try {
        const deletedBook = await deleteBookMongo(id);
        if (!deletedBook) {
            // Usa throwCustomError si no se encuentra el libro
            throwCustomError(404, 'Book not found');
        }
        return deletedBook;
    } catch (e) {
        throw e;
    }
}
