import express from "express";
import user_Routing from "./routing/userRouting";
import appLogger from "./app_logger/app_logger";
import { connectToDatabase } from "./data/mongoDb_client";

const app: express.Application = express();

app.use(express.json());
app.use(appLogger);
app.use("/v1/user", user_Routing);

const localHost: string = "localhost";
const portNumber: number = 5001;

app.listen(portNumber, localHost, async () => {
  await connectToDatabase();
  console.log(`https://${localHost}:${portNumber}/v1/user/`);
  console.log("Wellcom to MongoDb server");
});
