import jwt from 'jsonwebtoken';

/**
 * Middleware for protecting router using jwt
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next calls the next function
 * @return {json} returns json object as a response
 */
export default (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, authToken) => {
      if (err) {
        res.status(401).json({
          message: 'Sorry, user not authenticated, invalid access token'
        });
      } else {
        req.authToken = authToken;
        authToken = JSON.stringify(authToken);
        res.append('user', authToken);
        next();
      }
    });
  } else {
    res.status(403).send({ message: 'No token provided.' });
  }
};

