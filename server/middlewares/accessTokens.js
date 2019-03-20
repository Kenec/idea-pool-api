export default class AccessTokens {
  /**
   * validateRefreshToken - validates the refresh_token field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   */
  static validateRefreshToken(req, res, next) {
    if (!req.body.refresh_token) return res.status(400).json({ error: 'refresh_token field is required' });
    if (req.body.refresh_token.trim() === '') return res.status(400).json({ error: 'refresh_token field should not be empty' });

    next();
  }
}