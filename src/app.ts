import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

mongoose.connect('mongodb://localhost:8002/qlik_dev',
 () => {
  console.log('Connected to database!')
});

RegisterRoutes(app);
