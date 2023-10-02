import express from "express";
import user_Routing from "./routing/userRouting";
import post_Routing from "./routing/postRouting";
import appLogger from "./app_logger/app_logger";

const app: express.Application = express();

app.use(express.json());
app.use(appLogger);
app.use("/v1/user", user_Routing);
app.use("/v1/post", post_Routing);

const localHost: string = "localhost";
const portNumber: number = 5002;

app.listen(portNumber, localHost, () => {
  // console.log(`${localHost}:${portNumber}/v1/user/${user_Routing}`);
  console.log("Wellcom to express server Routing Optimization");
});
