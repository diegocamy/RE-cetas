import redis from "redis";
import { promisify } from "util";

export const redisClient = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: Number.parseInt(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Connected to redis");
});

export const set = promisify(redisClient.set).bind(redisClient);
export const expire = promisify(redisClient.expire).bind(redisClient);
export const get = promisify(redisClient.get).bind(redisClient);
