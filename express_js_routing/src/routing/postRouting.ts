import express from "express";

const post_Routing = express.Router();

post_Routing.get(
  "/GetPost/:id",
  (request: express.Request, responce: express.Response) => {
    let postId = request.params.id;

    // console.log(`Post id:${postId}`);

    responce.status(200).send(`<h1>Post Id detail ${postId}</h1>`);
  }
);

export default post_Routing;
