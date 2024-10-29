import express from "express";

import { getAllClients, getClientById, addClient } from "../controller/client.controller.js";
import { isSuperUser } from "../middleware/isSuperUser.js";
import { validate_client, handle_validation_errors } from "../middleware/clientValidation.js";

const router = express.Router();

router.get('/all', getAllClients); // All clients
router.get('/', getClientById); // One client

router.post('/add', [isSuperUser, validate_client, handle_validation_errors], addClient); // Add new client

export default router;