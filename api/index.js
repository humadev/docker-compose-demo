const express = require('express');
const app = express();
const cors = require('cors');
const Sequelize = require('sequelize');

// Enable CORS
app.use(cors());

// MySQL connection using Sequelize
const sequelize = new Sequelize('demo_db', 'root', 'password', {
  host: 'db',
  dialect: 'mysql',
});

app.use(express.json());

// Define a simple CRUD model
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

// Sync database
sequelize.sync();

// CRUD Routes
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.update(req.body, { where: { id: req.params.id } });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
