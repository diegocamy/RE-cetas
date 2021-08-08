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
  synchronize: true,
  logging: "all",
  ssl: process.env.NODE_ENV === "production" ? true : false,
  extra: process.env.NODE_ENV === "production" && {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [path.join(__dirname + "./../entities/*{.ts,.js}")],
  migrations: [path.join(__dirname + "./../migrations/*{.ts,.js}")],
  subscribers: [path.join(__dirname + "./../subscribers/*{.ts,.js}")],
  cli: {
    entitiesDir: path.join(__dirname + "./../entities/*{.ts,.js}"),
    migrationsDir: path.join(__dirname + "./../migrations/*{.ts,.js}"),
    subscribersDir: path.join(__dirname + "./../subscribers/*{.ts,.js}"),
  },
};

export default () => createConnection(options);
