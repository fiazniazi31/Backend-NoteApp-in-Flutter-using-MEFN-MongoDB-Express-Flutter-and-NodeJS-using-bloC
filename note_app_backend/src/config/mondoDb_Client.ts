import { MongoClient, Db } from "mongodb";

let mongodb: Db;

export async function connectToDatabase() {
  const url = `mongodb://127.0.0.1:27017`;
  const client = new MongoClient(url);

  mongodb = client.db("notedb");
  console.log("Note MongoDB Connected Successfully");
}

export function getDatabase(): Db {
  return mongodb;
}
