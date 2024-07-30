const redis = require('redis');

class RedisClient{
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error('Redis Client Error', error);
    }
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      await this.client.get(key, (err, reply) => {
	if (err) {
	  reject(err);
	} else {
	  resolve(reply);
	}
      });
    });
  }
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      await this.client.setex(key, duration, value, (err) => {
      if (err) {
	reject(err);
      } else {
	resolve();
      }
    });
  });
  })
}


