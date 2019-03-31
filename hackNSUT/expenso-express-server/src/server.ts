import dotenv from "dotenv";
import express from "express";
import functions from "firebase-functions";
import http from "http";
import serverless from "serverless-http";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { applyMiddleware, applyRoutes } from "./utils";

dotenv.config();

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`),
);

// module.exports.http = serverless(router);
// exports.http = functions.https.onRequest(router);
// module.exports = router;
