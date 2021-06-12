import path from "path";
import { createConnection, ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const options: ConnectionOptions = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT as number | undefined,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.NODE_ENV === "development" ? true : false,
  logging: "all",
  entities: [path.join(__dirname + "./../entities/*{.ts,.js}")],
  migrations: [path.join(__dirname + "./../migrations/*{.ts,.js}")],
  subscribers: [path.join(__dirname + "./../subscribers/*{.ts,.js}")],
};

export default () => createConnection(options);
