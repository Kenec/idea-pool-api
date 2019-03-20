import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/Users';
import client from '../config/redis';

/**
 * Define the accessTokens controller methods
 * @class AccessTokens 
 */
export default class AccessTokens {
  /**
   * Refresh - Gets new access token
   * @param {object} req 
   * @param {object} res 
   * @returns {object}
   */
  static refresh(req, res) {
    const refreshToken = req.body.refresh_token;

    client.get(refreshToken, (error, response) => {
      if (JSON.parse(response).refresh_token != null) {
        jwt.verify(JSON.parse(response).refresh_token, process.env.JWT_REFRESH_TOKEN, (err, authToken) => {
          if (err) {
            return res.status(401).json({ message: 'Refresh Token is Invalid' });
          } else {
            const userData = jwt.decode(JSON.parse(response).refresh_token);
            const newAccessToken = jwt.sign({ 
              id: userData.id, 
              name: userData.name, 
              email: userData.email }, 
              process.env.JWT_ACCESS_TOKEN, { expiresIn: 600 });

            client.set(refreshToken, JSON.stringify({ jwt: newAccessToken, refresh_token: refreshToken }));
            
            return res.status(200).json({ jwt: newAccessToken });
          }
        });
      } else {
        return res.status(404).json({ error: 'Invalid Request '});
      }
    });
  }

  /**
   * login - Authenticates already existing user
   * @param {object} req 
   * @param {object} res
   * @returns {object} 
   */
  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({ email }, (error, user) => {
      if (error) return res.status(500).send({ error: 'There seems to be some issue. Try agin!' });
      if (user === null) return res.status(401).send({ error: 'User does not exist' });
      
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return res.status(401).send({ error: 'User does not exits' });

      const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: 600 });
      const refresh_token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_REFRESH_TOKEN, { expiresIn: 86400 });

      const response = { jwt: token, refresh_token };
      client.set(refresh_token, JSON.stringify(response));

      return res.status(201).json(response);
    });
  }

}