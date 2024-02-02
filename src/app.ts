import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import Helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./globals/middlewares/error.middleware";
import notFoundHandler from "./globals/middlewares/notFound.middleware";
import ServerRoutes from "./server-routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(Helmet());
app.use(morgan("dev"));

// expose routes
app.use(ServerRoutes);

// add not found middleware
app.use(notFoundHandler);

// add error middleware
app.use(globalErrorHandler);

export default app;
