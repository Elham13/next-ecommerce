import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {};

let client;
let clientPromise: Promise<MongoClient>;
let _mongoClientPromise: any = undefined;
if (process.env.NODE_ENV === "development") {
  if (!_mongoClientPromise) {
    client = new MongoClient(uri, options);
    _mongoClientPromise = client.connect();
  }
  clientPromise = _mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
