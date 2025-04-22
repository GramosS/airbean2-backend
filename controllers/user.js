const express = require('express');
const Datastore = require('nedb');
const { nanoid } = require('nanoid');

const router = express.Router();
const usersDB = new Datastore({ filename: './db/users.db', autoload: true });

//Skapa användare 
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username och password krävs' });
  }

  const userId = nanoid();
  const newUser = {
    id: userId,
    username,
    password, // ingen lösen
    createdAt: new Date()
  };

  usersDB.insert(newUser, (err, createdUser) => {
    if (err) {
      console.error('Fel vid skapande av användare:', err);
      return res.status(500).json({ error: 'Serverfel vid skapande av användare' });
    }

    res.status(201).json({ userId: createdUser.id });
  });
});


 //  kontrollera användarnamn + lösenord 
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username och password krävs' });
  }

  usersDB.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error('Fel vid inloggning:', err);
      return res.status(500).json({ error: 'fel vid inlogg' });
    }

    if (!user) {
      return res.status(401).json({ isLoggedIn: false, error: 'Fel användarnamn eller lösenord' });
    }

    res.json({
      userId: user.id,
      isLoggedIn: true
    });
  });
});

module.exports = router;
