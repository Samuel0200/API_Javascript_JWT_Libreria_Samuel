import Book from '../models/Book.js';


//get one book
async function getBookMongo(filters){
    const bookFiltered = await Book.findOne(filters);
    return bookFiltered
}

//get many book
async function getBooksMongo(filters){
    const Booksquantity = await Book.countDocuments(filters);
    const bookFiltered = await Book.find(filters);

    return {
        results: bookFiltered,
        // paginaMax: Booksquantity / 20,
        Booksquantity : Booksquantity
    }; 
}

async function createBookMongo(data) {  
    const productoCreado = await Book.create(data);

    return productoCreado;
}

async function updateBookMongo(id, changes) {
    const resultado = await Book.findByIdAndUpdate(id, changes);
    
    return resultado
}

async function deleteBookMongo(id) {
    const resultado = await Book.findByIdAndUpdate(id, {disabled:true});
    return resultado;
}

async function getAvailabilityMongo(id){
    const book = await Book.findById(id);
    return book.availability;
}

module.exports = {
    createBookMongo,
    getBookMongo,
    getBooksMongo,
    updateBookMongo,
    deleteBookMongo,
    getAvailabilityMongo
};

