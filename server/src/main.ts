import express from "express";
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
// const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 8000;

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

// const algoliaService = createProxyMiddleware(
//     '/algolia-service',
//     {
//         target: 'http://localhost:8001',
//         changeOrigin: true,
//         pathRewrite: { '^/algolia': '' },
//     }
// );

// const notificationService = createProxyMiddleware(
//     '/notification-service',
//     {
//         target: 'http://localhost:8002',
//         changeOrigin: true,
//         pathRewrite: { '^/notification': '' },
//     }
// );

// const googleSerivce = createProxyMiddleware(
//     '/google-service',
//     {
//         target: 'http://localhost:8003',
//         changeOrigin: true,
//         pathRewrite: { '^/google': '' },
//     }
// );

// const healthubSerivce = createProxyMiddleware(
//     '/healthub-service',
//     {
//         target: 'http://localhost:8004',
//         changeOrigin: true,
//         pathRewrite: { '^/healthub': '' },
//     }
// );
        
// const identitySerivce = createProxyMiddleware(
//     '/identity-service',
//     {
//         target: 'http://localhost:8005',
//         changeOrigin: true,
//         pathRewrite: { '^/service3': '' },
//     }
// );

// const mailerSerivce = createProxyMiddleware(
//     '/mailer-service',
//     {
//         target: 'http://localhost:8006',
//         changeOrigin: true,
//         pathRewrite: { '^/mailer': '' },
//     }
// );

// const mediaSerivce = createProxyMiddleware(
//     '/media-service',
//     {
//         target: 'http://localhost:8007',
//         changeOrigin: true,
//         pathRewrite: { '^/media': '' },
//     }
// );

// const paymentSerivce = createProxyMiddleware(
//     '/payment-service',
//     {
//         target: 'http://localhost:8008',
//         changeOrigin: true,
//         pathRewrite: { '^/payment': '' },
//     }
// );

// const threadschatSerivce = createProxyMiddleware(
//     '/threadschat-service',
//     {
//         target: 'http://localhost:8009',
//         changeOrigin: true,
//         pathRewrite: { '^/threadschat': '' },
//     }
// );

// app.use(algoliaService);
// app.use(notificationService);
// app.use(googleSerivce);
// app.use(healthubSerivce);
// app.use(identitySerivce);
// app.use(mailerSerivce);
// app.use(mediaSerivce);
// app.use(paymentSerivce);
// app.use(threadschatSerivce);

const server = http.createServer(app);

server.listen(
    port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }
);
