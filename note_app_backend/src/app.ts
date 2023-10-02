import express from "express";
import cors from "cors";
import appLogger from "./middleware/app_logger";
import { connectToDatabase } from "./config/mondoDb_Client";
import userRouter from "./router/user_router";
import noteRouter from "./router/note_router";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(appLogger);
app.use(express.urlencoded({ extended: false }));
app.use("/v1/user", userRouter);
app.use("/v1/note", noteRouter);

const hostName = "0.0.0.0";
const portNumber = 5000;

app.listen(portNumber, hostName, async () => {
  console.log("Welcom to noteApp Backend server");
  await connectToDatabase();
});
