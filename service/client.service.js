import { Client } from "../model/client.model.js";
import { logger } from "../middleware/logger.js";

// Get all clients 
const getAllClients = async () => {
    try {
        return await Client.find();
    } catch (error) {
        console.log(error);
        logger.error(error.message);
    };
};

// Get client by ID
const getClientById = async id => {
    try {
        return await Client.findOne({ _id: id });
    } catch (error) {
        console.log(error);
        logger.error(error.message);  
    };
};

// Add new client
const addClient = async client => {
    try {
        return new Client(client).save();
    } catch (error) {
        console.log(error);
        logger.error(error.message);  
    };
};

export default {
    getAllClients,
    getClientById,
    addClient
};