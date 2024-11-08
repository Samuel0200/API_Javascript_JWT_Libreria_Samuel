import { createReservationMongo, getReservationMongo, getReservationsMongo, updateReservationMongo, deleteReservationMongo } from '../actions/Reservation';
import {getBookMongo} from '../actions/Book';
import { throwCustomError } from '../utils/FunctionsResponses';

export async function getReservation(query) {
    try {
        const filters = { ...query, disabled: false };
        const reservation = await getReservationMongo(filters);
        if (!reservation) {
            throwCustomError(404, 'Reservation not found');
        }

        return reservation.toObject();
    } catch (e) {
        throw e;
    }
}

export async function getReservations(query) {
    try {
        const filters = { ...query, disabled: false };
        const filteredReservationResults = await getReservationsMongo(filters);
        if (!filteredReservationResults) {
            throwCustomError(404, 'Reservations not found');
        }

        return filteredReservationResults;
    } catch (e) {
        throw e;
    }
}

export async function createReservation(data) {
    try {
        const bookId = data.book
        if(!bookId){
            throwCustomError(404, 'missing book field');
        }
        const book = await getBookMongo({"_id":bookId});
        if (!book){
            throwCustomError(404, 'Book not found');
        }
        if (!book.availability){
            throwCustomError(400, 'Book is not available');
        }
        const createdReservation = await createReservationMongo(data);
        return createdReservation;
    } catch (e) {
        throw e;
    }
}

export async function patchReservation(data) {
    try {
        
        const { _id, ...changes } = data;
        const updatedReservation = await updateReservationMongo(_id, changes);

         if (!updatedReservation) {
            throwCustomError(404, 'Reservation not found');
        }
        return updatedReservation;
    } catch (e) {
        throw e;
    }
}

export async function deleteReservation(id) {
    try {
        const deletedReservation = await deleteReservationMongo(id);
        if (!deletedReservation) {
            throwCustomError(404, 'Reservation not found');
        }
        return deletedReservation;
    } catch (e) {
        throw e;
    }
}
