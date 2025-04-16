const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const menuPath = path.join(__dirname, '..', 'db', 'menu.json');
  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Kunde inte läsa menyfil:', err);
      return res.status(500).json({ error: 'Kunde inte läsa meny' });
    }

    const menu = JSON.parse(data);
    res.json(menu);
  });
});

module.exports = router;