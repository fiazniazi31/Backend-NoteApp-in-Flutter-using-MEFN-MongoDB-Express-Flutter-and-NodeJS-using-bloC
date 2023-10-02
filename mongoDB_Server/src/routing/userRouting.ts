import express from "express";
import { getDatabase } from "../data/mongoDb_client";
import { ObjectId } from "mongodb";

const user_Routing = express.Router();

user_Routing.post(
  "/addNewUser",
  async (request: express.Request, response: express.Response) => {
    let db = getDatabase();

    let usersCollection = db.collection("users");

    let body = request.body;

    const data = await usersCollection.insertOne(body);

    response.status(200).json({
      "Responce": data,
    });
  }
);

user_Routing.get(
  "/getUser",
  async (request: express.Request, response: express.Response) => {
    let db = getDatabase();

    let usersCollection = db.collection("users");

    let body = request.body;

    const data = await usersCollection.find({}).toArray();

    response.status(200).json({
      "Responce": data,
    });
  }
);

user_Routing.get(
  "/getProfile/:id",
  async (request: express.Request, response: express.Response) => {
    let userId = request.params.id;

    let db = getDatabase();

    let usersCollection = db.collection("users");

    let data = await usersCollection
      .find({ "_id": new ObjectId(userId) })
      .toArray();

    response.status(200).json({
      "response": data,
    });
  }
);

user_Routing.put(
  "/updateUser",
  async (request: express.Request, response: express.Response) => {
    let db = getDatabase();

    let usersCollection = db.collection("users");

    const body = request.body;

    const userObject = { name: body.name, following: body.following };

    const data = await usersCollection.updateOne(
      { _id: new ObjectId(body.userId) },
      { $set: userObject }
    );

    response.status(200).json({
      "Responce": data,
    });
  }
);

user_Routing.delete(
  "/deleteUser",
  async (request: express.Request, response: express.Response) => {
    let db = getDatabase();

    let usersCollection = db.collection("users");

    let userId = request.body.userId;

    const data = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

    response.status(200).json({
      "Responce": data,
    });
  }
);

export default user_Routing;
