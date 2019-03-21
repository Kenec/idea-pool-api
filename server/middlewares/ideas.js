import Idea from '..//models/Ideas';

export default class IdeasMiddleware {
  /**
   * validateContent - validates the content field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @return {object}
   */
  static validateContent(req, res, next) {
    if (!req.body.content) return res.status(400).json({ error: 'content field is required' });
    if (req.body.content.trim() === '') return res.status(400).json({ error: 'content field should not be empty' });
    if (req.body.content.length > 255) return res.status(400).json({ error: 'content length should not be more than 255 character' });

    next();
  }

  /**
   * validateImpact - validates the impact field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object} 
   */
  static validateImpact(req, res, next) {
    if (!Number(req.body.impact)) return res.status(400).json({ error: 'impact field is required' });
    if (!Number.isInteger(Number(req.body.impact))) return res.status(400).json({ error: 'impact should be an integer' });
    if ((Number(req.body.impact) < 1) || (Number(req.body.impact) > 10)) return res.status(400).json({ error: 'impact should be in the range of 1 to 10' });

    next();
  }

  /**
   * validateEase - validates the ease field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @return {object} 
   */
  static validateEase(req, res, next) {
    if (!Number(req.body.ease)) return res.status(400).json({ error: 'ease field is required' });
    if (!Number.isInteger(Number(req.body.ease))) return res.status(400).json({ error: 'ease should be an integer' });
    if ((Number(req.body.ease) < 1) || (Number(req.body.ease) > 10)) return res.status(400).json({ error: 'ease should be in the range of 1 to 10' });

    next();
  }

  /**
   * validateConfidence - validates the confidence field
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object}
   */
  static validateConfidence(req, res, next) {
    if (!Number(req.body.confidence)) return res.status(400).json({ error: 'confidence field is required' });
    if (!Number.isInteger(Number(req.body.confidence))) return res.status(400).json({ error: 'confidence should be an integer' });
    if ((Number(req.body.confidence) < 1) || (Number(req.body.confidence) > 10)) return res.status(400).json({ error: 'confidence should be in the range of 1 to 10' });

    next();
  }

  /**
   * validateId - validates Id
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @return {object} 
   */
  static validateId(req, res, next) {
    if (!req.params.id) return res.status(404).json({ error: 'id param is required' });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: 'id not a valid object' });
    
    Idea.findOne({ _id: req.params.id }, (error, id) => {
      if (error) return res.status(500).send({ error: 'Error checking for the id', error });
      if (id === null) return res.status(404).json({ error: 'ID Not Found' });

      next();
    });
  }
}