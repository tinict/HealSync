import "reflect-metadata";
import { DataSource } from "typeorm";
import config from '../config';

export const dataSource = new DataSource({
    type: 'mysql',
    host: config.serviceRegistry.database.host,
    port: 3306,
    username: config.serviceRegistry.database.user,
    password: config.serviceRegistry.database.password,
    database: config.serviceRegistry.database.name,
    synchronize: false,
    logging: false,
    entities: ["./Entities/**/*.ts"],
    migrations: ["./Migrations/**/*.ts"],
    subscribers: ["./Subscribers/**/*.ts"],
});