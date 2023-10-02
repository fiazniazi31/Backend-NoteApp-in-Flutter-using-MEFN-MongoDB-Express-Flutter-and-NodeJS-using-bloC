import express from "express";

const app: express.Application = express();

const localHost: string = "localhost";
const portNumber: number = 5000;

app.get("/", (request, responce) => {
  responce.send("<h1>express server. Method Get</h1>");
});

app.post("/create", (request, responce) => {
  responce.send("<h1>express server. Method post</h1>");
});

app.put("/update", (request, responce) => {
  responce.send("<h1>express server. Method update</h1>");
});

app.delete("/delete", (request, responce) => {
  responce.send("<h1>express server. Method delete</h1>");
});

app.listen(portNumber, localHost, () => {
  console.log("Wellcom to express server");
});
