import Users from '../models/Users';

export default class UserMiddleware {
  /**
   * validateName - validates the name field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object} 
   */
  static validateName(req, res, next) {
    if (!req.body.name) return res.status(400).json({ error: 'name field is required' });
    if (req.body.name.trim() === '') return res.status(400).json({ error: 'name field should not be empty' });

    next();
  }

  /**
   * validateEmail - validates the email field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object} 
   */
  static validateEmail(req, res, next) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!req.body.email) return res.status(400).json({ error: 'email field is required' });
    if (req.body.email.trim() === '') return res.status(400).json({ error: 'email field should not be empty' });
    if (!re.test(String(req.body.email).toLowerCase())) return res.status(400).json({ error: 'Invalid Email Format' });

    next();
  }

  /**
   * validatesPassword - validates the password field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object} 
   */
  static validatePassword(req, res, next) {
    let re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

    if (!req.body.password) return res.status(400).json({ error: 'password field is required' });
    if (req.body.password.trim() === '') return res.status(400).json({ error: 'password field should not be empty' });
    if (req.body.password.length < 8) return res.status(400).json({ error: 'Password should be at least 8 characters' });
    if (!re.test(String(req.body.password))) return res.status(400).json({ error: 'Password should contain 1 uppercase, 1 lowercase and 1 number' });

    next();
  }

  /**
   * validatePasswordMatch - validates if the password and confirmPassword match
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {obejct}
   */
  static validatePasswordMatch(req, res, next) {
    if (req.body.password !== req.body.repassword) return res.status(400).json({ error: 'password did not match' });
    next();
  }

  /**
   * userExists - validates if user already exists
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object}
   */
  static userExists(req, res, next) {
    Users.findOne({ email: req.body.email }, (error, user) => {
      if (error) return res.status(500).json({ error: 'Error checking if user exists', error });
      if (user !== null) return res.status(409).json({ error: 'User already exists!' });

      next();
    });
  }
}