import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import User from '../models/Users';
import client from '../config/redis';

/**
 * Define the users controller methods
 * @class Users 
 */
export default class Users {
  /**
   * Signup - Creates new user
   * @param {object} req 
   * @param {object} res 
   * @returns {object}
   */
  static signup(req, res) {
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 10);

    const { name, email } = req.body;

    const userPayload = { name, email, password: hash };
    const newUser = new User(userPayload);

    newUser.save(error => {
      if (error) return res.status(500).json({ error:'Error while saving..', error });

      const token = jwt.sign({ id: newUser._id, name, email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: 600 });
      const refresh_token = jwt.sign({ id: newUser._id, name, email }, process.env.JWT_REFRESH_TOKEN, { expiresIn: 86400 });

      const response = { jwt: token, refresh_token };
      client.set(refresh_token, JSON.stringify(response));

      return res.status(201).json(response);
    });
  }

  /**
   * CurrentUser - get the current user detail
   * @param {object} req 
   * @param {object} res
   * @returns {object} 
   */
  static currentUser(req, res) {
    if (!req.headers['x-access-token']) return res.status(404).json({ error: 'Token not found' });

    const { name, email } = jwt.decode(req.headers['x-access-token']);
    const imageHash = md5(email);
    
    return res.status(200).json({ email, name, avatar_url: `https://www.gravatar.com/avatar/${imageHash}?d=mm&s=200` });
  }
}
