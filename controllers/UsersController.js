import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';


const UsersController = {
  postNew: async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: 'Missing email' });

    if (!password) return res.status(400).send({ error: 'Missing password' });

    const existingUser = await dbClient.db.collection('users').findOne({ email });

    if (existingUser) return res.status(400).json({ error: 'Already exist' });

    const hashedPassword = sha1(password);
    const result = await dbClient.db.collection('users').insertOne({ email, password: hashedPassword });

    return res.status(201).json({ id: result.insertedId, email });
  },

  getMe: async (req, res) => {
    const token = req.headers['X-Token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(200).json({ id: user._id, email: user.email });
  },
};
module.exports = UsersController;
