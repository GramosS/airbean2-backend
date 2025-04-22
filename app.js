const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.json());

// importera routes
const menuRoute = require('./controllers/menu');
const userRoute = require('./controllers/user');
const orderRoute = require('./controllers/order'); 

// koppla routes
app.use('/menu', menuRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);

// starta servern
app.listen(PORT, () => {
  console.log(`AirBean-servern är igång på http://localhost:${PORT}`);
});