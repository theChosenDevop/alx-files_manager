import redisClient from "../utils/redis";
import dbClient from "../utils/db";

const AppController = {
  async getStatus(req, res) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();

    res.status(200).send({ redis: redisStatus, db: sbStatus });
  },
};
