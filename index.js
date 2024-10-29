import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

import { ExpressSession } from "./middleware/session.js";
import { connect } from "./database/db.js";
import MainRoute from "./routes/index.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ExpressSession);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api', MainRoute); // Main Route

app.listen(PORT, () => {
    connect();
    console.log(`Server working on ${PORT} port`);
});