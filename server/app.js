import cors from 'cors';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as http from "http";
import { Server } from 'socket.io'

const app = express();

const server = http.createServer(app)
const io = new Server(server)

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.use(cors());
app.use(bodyParser.json());
app.use('/api',routes);
dotenv.config({path: './server/.env'});

mongoose.connect(
    'mongodb://localhost:27017/JelloDB',
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
    (err) => {
        if (err) return console.log(err);
        app.listen(3000, () => {
            console.log('Сервер ожидает подключения...');
        });
        io.on("connection", (socket) => {
            console.log('connection established')
        })
    }
);

app.get('/', function (request, response) {
    response.end('Hello from Express!');
});
