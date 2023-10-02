import express from "express";
import { getDatabase } from "../config/mondoDb_Client";
import { User } from "../models/user_model";
import bcrypt from "bcrypt";
import e from "express";
import { runInNewContext } from "vm";
import { ObjectId } from "mongodb";

export class userController {
  static async signup(requsert: express.Request, response: express.Response) {
    let db = getDatabase();

    let usreCollection = db.collection("users");

    const user: User = requsert.body;

    const checkUserInDb = {
      email: user.email,
    };

    const data = await usreCollection.find(checkUserInDb).toArray();

    if (data.length != 0) {
      response.status(403).send({
        "status": "Failuer",
        "response": "User already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const resData = await usreCollection.insertOne(user);

      const objId = resData.insertedId;

      const userInfo = await usreCollection
        .find({ _id: new Object(objId) })
        .toArray();

      const userresponseDate = userInfo[0];

      userresponseDate.password = "";
      response.status(200).send({
        "status": "Success",
        "response": userresponseDate,
      });
    }
  }

  static async signIn(requsert: express.Request, response: express.Response) {
    let db = getDatabase();

    let usreCollection = db.collection("users");

    const user: User = requsert.body;

    const checkUserInDb = {
      email: user.email,
    };

    const data = await usreCollection.find(checkUserInDb).toArray();

    if (data.length != 0) {
      //login here if user find
      let userInfo = data[0];
      const pass = await bcrypt.compare(user.password, userInfo.password);
      if (user.email == userInfo.email && pass) {
        userInfo.password = "";

        response.status(200).json({
          "status": "Success",
          "response": userInfo,
        });
      } else {
        response.status(403).send({
          "status": "Failuer",
          "response": "Invalid Email or Password",
        });
      }
    } else {
      response.status(403).send({
        "status": "Failuer",
        "response": "Invalid Email or Password",
      });
    }
  }

  static async myProfile(
    requsert: express.Request,
    response: express.Response
  ) {
    let db = getDatabase();

    let usresCollection = db.collection("users");

    const uid = requsert.query.uid;

    const userData = await usresCollection
      .find({ _id: new ObjectId(uid!.toString()) })
      .toArray();

    response.status(200).json({
      "status": "Success",
      "response": userData[0],
    });
  }

  static async updateProfile(
    request: express.Request,
    response: express.Response
  ) {
    let db = getDatabase();

    let usersCollection = db.collection("users");

    const user: User = request.body;

    const updateUserObject = {
      username: user.username,
    };

    const updateUserInfo = await usersCollection.updateOne(
      { _id: new ObjectId(user.uid) },
      { $set: updateUserObject }
    );

    response.status(200).json({
      "status": "success",
      "response": updateUserInfo,
    });
  }
}
