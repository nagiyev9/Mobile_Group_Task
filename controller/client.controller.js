import clientService from "../service/client.service.js";
import { logger } from "../middleware/logger.js";

// Get all clients
export const getAllClients = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        console.log(error);  
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    };
};

export const getClientById = async (req, res) => {
    try {
        const { clientID } = req.query;

        const client = await clientService.getClientById(clientID);

        if (!client) {
            return res.status(404).json({ error: "Client could not found" });
        };

        res.status(200).json(client);
    } catch (error) {
        console.log(error);  
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    };
};

export const addClient = async (req, res) => {
    try {
        const { company_name, client_name, phone } = req.body;

        const newClient = await clientService.addClient({
            company_name,
            client_name,
            phone
        });

        res.status(201).json({
            message: "Client added",
            data: newClient
        });
    } catch (error) {
        console.log(error);  
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    };
};