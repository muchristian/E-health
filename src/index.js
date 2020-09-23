import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors);

const port = process.env.PORT || 5000
const server =  app.listen(port, (p) => {
    console.log(`server port is running on ${server.address().port}`);
})
