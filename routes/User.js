import { createUser, deleteUser, getUser, getUsers, patchUser } from "../controllers/User.js";
import { authorizeWithPermissions } from "../middleware/Auth.js";
import { Router } from 'express';
const { respondWithError } = require('../utils/FunctionsResponses');


const router = Router();

// Used only for specific user searches
async function getUserById(req, res) {
    try {
        // Call the controller with the user ID
        const searchResults = await getUser(req.params);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        res.status(500).json({ msg: "Error retrieving user data." });
    }
}

async function getMyUser(req, res) {
    try {
        // Call the controller with the user ID
        const filter = {"_id":req.userId}
        const searchResults = await getUser(filter);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        res.status(500).json({ msg: "Error retrieving user data." });
    }
}

// Used only for filtered user searches
async function getUsersHandler(req, res) {
    try {
        // Call the controller with the query filters
        const searchResults = await getUsers(req.query);
        res.status(200).json({
            ...searchResults
        });
    } catch (e) {
        console.error("Error occurred while fetching users:", e); // Optional: Add error logging
        respondWithError(res, e);  // Delegate error response
    }
}

// Does not require authentication
async function createUserHandler(req, res) {
    try {
        // Call the controller with the provided data
        await createUser(req.body);

        res.status(200).json({
            message: "User successfully created. 👍"
        });
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            message: "Error creating user.",
            err: err.msg,
        });
    }
}

// Requires authentication below this line
async function updateUserHandler(req, res) {
    try {
        // Call the controller with the provided data
        await patchUser(req.body);

        res.status(200).json({
            message: "User successfully updated. 👍"
        });
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            message: "Error updating user.",
            err: err.msg,
        });
    }
}

async function deleteUserHandler(req, res) {
    try {
        // Call the controller with the user ID
        await deleteUser(req.params.id);

        res.status(200).json({
            message: "User successfully deleted. 👍"
        });
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            message: "Error deleting user.",
            err: err.msg,
        });
    }
}


router.get('/buscar', getUsersHandler);
router.get('/buscar/:_id', getUserById);
router.get('/myUser',authorizeWithPermissions(), getMyUser);

router.post('/create', createUserHandler);
router.patch('/:id', authorizeWithPermissions(["editUsers"], true), updateUserHandler);
router.delete('/:id', authorizeWithPermissions(["deleteUsers"], true), deleteUserHandler);

export default router;
