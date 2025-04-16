module.exports = function validateInput(req, res, next) {
    const { userId, items } = req.body;
  
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'userId och items krävs' });
    }
  
    next();
  };