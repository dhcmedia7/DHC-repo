// src/app/lib/mongodb.js
import { MongoClient } from "mongodb";



const uri = `mongodb+srv://${process.env.NEXT_MONGO_USER}:${process.env.NEXT_MONGO_PASS}@chowon6.xxunznr.mongodb.net/?retryWrites=true&w=majority&appName=Chowon6`;


let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000,
  });
  clientPromise = client.connect();
}

export default clientPromise;
