import Idea from '../models/Ideas';

export default class Ideas {
  /**
   * Create - create new idea
   * @param {object} req 
   * @param {object} res
   * @return {object} 
   */
  static create(req, res) {
    const { content, impact, ease, confidence } = req.body;

    const newImpact = parseInt(impact, 10);
    const newEase = parseInt(ease, 10);
    const newConfidence = parseInt(confidence, 10);

    const average_score = parseFloat((newImpact + newEase + newConfidence) / 3);
    const newIdea = new Idea({ content, impact: newImpact, ease: newEase, confidence: newConfidence, average_score });

    newIdea.save(error => {
      if (error) return res.status(500).json({ error:'Error while saving..', error });

      const response = { 
          id: newIdea._id, 
          content, 
          impact: newImpact, 
          ease: newEase, 
          confidence: newConfidence, 
          average_score, 
          created_at: newIdea.create_date  
      };
      
      return res.status(201).json(response);
    });
  }

  /**
   * GetIdea  - retrieve ideas
   * @param {object} req 
   * @param {object} res
   * @return {object} 
   */
  static getIdea(req, res) {
    let perPage = 10;
    let page = req.params.page || 1;
    let order = -1;

    if (req.query.order) { order === 'asc' ? order = 1 : order = -1 }
    
    Idea.find({})
      .sort({ average_score: order })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, ideas) => {
          Idea.countDocuments().exec((err, count) => {
              if (err) return res.status(500).json({ error: 'Error while fetching ideas' });

              return res.status(200).json(ideas);
          })
      });
  }

  /**
   * Update - update idea
   * @param {object} req 
   * @param {object} res
   * @returns {object} 
   */
  static update(req, res) {
    Idea.findById(req.params.id, (error, idea) => {
      if (error) return res.status(404).json({ error: 'Idea does not exit' });

      idea.content = req.body.content;
      idea.impact = parseInt(req.body.impact, 10);
      idea.ease = parseInt(req.body.ease, 10);
      idea.confidence = parseInt(req.body.confidence, 10);

      idea.save(error => {
        if (error) return res.status(500).json({ error: 'Error occured while updating idea!' });
        return res.status(200).send({ 
          content: idea.content,
          impact: idea.impact,
          ease: idea.ease,
          confidence:  idea.confidence
         });
      });
    });
  }

  /**
   * Delete - delete an idea by id
   * @param {object} req 
   * @param {object} res
   * @returns {object}
   */
  static delete(req, res) {
    Idea.deleteOne({ _id: req.params.id }, error => {
      if (error) return res.status(500).json({ error: 'Error occured while deleting idea!' });
      return res.status(204).send({});
    });
  }
}