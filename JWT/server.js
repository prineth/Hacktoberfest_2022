require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
app.use(express.json()); //to parse json data

const posts = [
  {
    username: 'Bob',
    title: 'Post 1',
  },
  {
    username: 'John',
    title: 'Post 2',
  },
];

// GET /posts
app.get('/posts', authenicateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authenicateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
