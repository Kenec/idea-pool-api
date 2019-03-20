import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
}