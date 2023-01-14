import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from './routes/'
import { createDefault } from "./services/";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL = `mongodb+srv://${process.env.MONGODB_UNAME}:${process.env.MONGODB_PASS}@tinkerbellgarden.rchrghq.mongodb.net/${process.env.MONGDB_DBNAME}?retryWrites=true&w=majority`;

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json({limit: "30mb", extended : true})); 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/api', router)

app.get("/", (req, res) => res.send('Hello World!'));


createDefault()

mongoose.set("strictQuery", false);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`)))
    .catch((error) => console.log(error.message));