import express from "express";
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import route from "./Http/Routes";
import { dataSource } from "./Database/dataSource";
import config from './config';
import zealClient from "./Synchronized/zeal.client";

const port = config.server.port;

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false
}))

app.use(cors());

app.use(compression());

app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    })
);

app.use(morgan('dev'));

const server = http.createServer(app);

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

route(app);

zealClient;

server.listen(
    port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }
);