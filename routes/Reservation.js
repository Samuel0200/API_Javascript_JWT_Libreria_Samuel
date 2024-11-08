import { createReservation, deleteReservation, getReservation, getReservations, patchReservation } from "../controllers/Reservation.js";
import { authorizeWithPermissions } from "../middleware/Auth.js";
import { Router } from 'express';
const { respondWithError, throwCustomError } = require('../utils/FunctionsResponses.js');


const router = Router();

async function getReservationById(req, res) {
    try {
        // Call the controller with the reservation ID
        const searchResults = await getReservation(req.params);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

// Used only for filtered reservation searches
async function getReservationsHandler(req, res) {
    try {
        // Call the controller with the query filters
        const searchResults = await getReservations(req.query);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        console.error("Error occurred while fetching reservations:", e); // Optional: Add error logging
        respondWithError(res, e);  // Delegate error response
    }
}

async function getMyReservationsHandler(req, res) {
    try {
        // Call the controller with the query filters
        filters ={...req.query, "user":req.userId};
        const searchResults = await getReservations(filters);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        console.error("Error occurred while fetching reservations:", e); // Optional: Add error logging
        respondWithError(res, e);  // Delegate error response
    }
}

// Does not require authentication
async function createReservationHandler(req, res) {
    try {
        // Call the controller with the provided data
        const data = {...req.body, "user":req.userId};
        await createReservation(data);

        res.status(200).json({
            message: "Reservation successfully created. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

// Requires authentication below this line
async function updateReservationHandler(req, res) {
    try {
        // Call the controller with the provided data
        const data = { _id: req.params._id, ...req.body };
        await patchReservation(data);
        res.status(200).json({
            message: "Reservation successfully updated. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function deleteReservationHandler(req, res) {
    try {
        // Call the controller with the reservation ID
        await deleteReservation(req.params._id);

        res.status(200).json({
            message: "Reservation successfully deleted. 👍"
        });
    } catch (e) {
        respondWithError(res, e);
    }
}


router.get('/',authorizeWithPermissions(), getReservationsHandler);  
router.get('/:_id',authorizeWithPermissions(), getReservationById);
router.get('/myreservations',authorizeWithPermissions(), getMyReservationsHandler);
router.post('/create', authorizeWithPermissions(),createReservationHandler);
router.patch('/:_id', authorizeWithPermissions(), updateReservationHandler);
router.delete('/:_id', authorizeWithPermissions(), deleteReservationHandler);



export default router;