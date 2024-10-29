import mongoose from "mongoose";

// Schema
const ClientSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    client_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// Model
export const Client = mongoose.model('clients', ClientSchema);