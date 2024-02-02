import express from "express";
import V1_ROUTES from "./v1/v1-routes";

const ServerRoutes = express.Router();

ServerRoutes.get("/", (req, res) => {
  res.send(`⚡ API up and running ⚡`);
});

ServerRoutes.use("/v1", V1_ROUTES);

export default ServerRoutes;
