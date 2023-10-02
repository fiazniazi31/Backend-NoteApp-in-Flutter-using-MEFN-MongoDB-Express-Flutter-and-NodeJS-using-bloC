import express from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import appLogger from "../app_logger/app_logger";

const user_Routing = express.Router();

user_Routing.get("/", (request, responce) => {
  responce.send("<h1>express server. Method Get</h1>");
});

user_Routing.post("/create", (request, responce) => {
  responce.send("<h1>express server. Method post</h1>");
});

user_Routing.put("/update", (request, responce) => {
  responce.send("<h1>express server. Method update</h1>");
});

user_Routing.delete("/delete", (request, responce) => {
  responce.send("<h1>express server. Method delete</h1>");
});

user_Routing.post("/login", (request, responce) => {
  let body = request.body;
  let { email, password } = request.body;

  if (email == "fiaz@div" && password == "123456") {
    responce.status(200).json({
      "status": responce.statusCode,
      "data": body,
      "msg": "User Login Successfully",
    });
  } else {
    responce.status(401).json({
      "status": responce.statusCode,
      "data": body,
      "msg": "Invalid email password",
    });
  }
});

user_Routing.post(
  "/crateUser",
  [
    body("email").not().isEmpty().isEmail().withMessage("Email Required"),
    body("name").not().isEmpty(),
  ],
  appLogger,
  async (request: express.Request, responce: express.Response) => {
    let body = request.body;
    let { email, password, name } = request.body;
    let error = validationResult(request);
    if (!error.isEmpty()) {
      responce.status(400).json({
        "status": responce.statusCode,
        "data": error,
      });
    } else {
      let salt = await bcrypt.genSalt();
      let hashPassword = await bcrypt.hash(password, salt);
      responce.status(200).json({
        "status": responce.statusCode,
        "data": body,
        "hashPassword": hashPassword,
      });
    }
  }
);

export default user_Routing;
