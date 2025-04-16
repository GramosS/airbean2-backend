const fs = require('fs');
const path = require('path');

// Läs in menyn
const menuPath = path.join(__dirname, '..', 'db', 'menu.json');
const menuData = fs.readFileSync(menuPath, 'utf8');
const menu = JSON.parse(menuData).menu;

module.exports = function validateMenuItem(req, res, next) {
  const { items } = req.body;

  let total = 0;
  const validatedItems = [];

  for (const item of items) {
    const found = menu.find(product => product.id === item.id);

    if (!found) {
      return res.status(400).json({ error: `Produkten med id ${item.id} finns inte i menyn` });
    }

    if (found.price !== item.price) {
      return res.status(400).json({ error: `Fel pris på produkt med id ${item.id}` });
    }

    total += item.price;
    validatedItems.push(found);
  }

  req.validatedItems = validatedItems;
  req.total = total;

  next();
};