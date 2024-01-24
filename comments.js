// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
// Use body parser middleware
app.use(bodyParser.json());
// Use cors middleware
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
// Create comment
app.post('/posts/:id/comments', (req, res) => {
  // Create comment id
  const commentId = randomBytes(4).toString('hex');
  // Get comment content
  const { content } = req.body;
  // Get comments by post id
  const comments = commentsByPostId[req.params.id] || [];
  // Push new comment
  comments.push({ id: commentId, content });
  // Store comments
  commentsByPostId[req.params.id] = comments;
  // Send comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});