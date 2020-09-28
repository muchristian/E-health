import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import allroutes from "./routes/index";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(allroutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server port is running on ${server.address().port}`);
});
