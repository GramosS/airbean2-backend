const express = require('express');
const Datastore = require('nedb');
const { nanoid } = require('nanoid');

const router = express.Router();
const usersDB = new Datastore({ filename: './db/users.db', autoload: true });

router.post('/', (req, res) => {
  const userId = nanoid();

  const newUser = {
    id: userId,
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

module.exports = router;