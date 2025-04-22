const express = require('express');
const Datastore = require('nedb');
const validateInput = require('../middleware/validateInput');
const validateMenuItem = require('../middleware/validateMenuItem');

const router = express.Router();
const ordersDB = new Datastore({ filename: './db/orders.db', autoload: true });

// POST  skapa ny order
router.post('/', validateInput, validateMenuItem, (req, res) => {
  const { userId } = req.body;
  const { validatedItems, total } = req;

  const newOrder = {
    userId,
    items: validatedItems,
    total,
    createdAt: new Date()
  };

  ordersDB.insert(newOrder, (err, createdOrder) => {
    if (err) {
      return res.status(500).json({ error: 'Kunde inte spara order' });
    }

    res.status(201).json({
      message: 'Order bekräftad!',
      eta: '15 minuter',
      order: {
        id: createdOrder._id,
        total: createdOrder.total
      }
    });
  });
});

// GET userId  hämta historik
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  ordersDB.find({ userId }).sort({ createdAt: -1 }).exec((err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Kunde inte hämta orderhistorik' });
    }

    res.json({
      userId,
      totalOrders: orders.length,
      orders: orders.map(order => ({
        id: order._id,
        items: order.items,
        total: order.total,
        createdAt: order.createdAt
      }))
    });
  });
});

module.exports = router;