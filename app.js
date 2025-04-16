const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware för att tolka JSON i request body
app.use(express.json());

// Importera routes
const menuRoute = require('./controllers/menu');
const userRoute = require('./controllers/user');
const orderRoute = require('./controllers/order'); // Viktigt att det heter exakt som filnamnet (order.js)

// Koppla routes
app.use('/menu', menuRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);

// Starta servern
app.listen(PORT, () => {
  console.log(`AirBean-servern är igång på http://localhost:${PORT}`);
});