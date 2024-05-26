import express from "express";
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import config from './config';
import ZealSyncClient from "./zealsync.client";
import { ZealSync } from "../zealsync.service";

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

async function startServer() {
    const zealSync = new ZealSync();
    const zealClient = await zealSync.init();
    ZealSyncClient(zealClient);
}

startServer();

const server = http.createServer(app);

server.listen(
    port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }
);