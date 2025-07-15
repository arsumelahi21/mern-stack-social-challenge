const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');


const ALL_POSTS = [
  { id: 1, author: 'Alice', content: 'Hello world! 🎉' },
  { id: 2, author: 'Bob', content: 'React is awesome.' },
  { id: 3, author: 'Charlie', content: 'How is everyone doing?' },
  { id: 4, author: 'Dave', content: 'Enjoying a sunny day.' },
  { id: 5, author: 'Emma', content: 'Just learned about Express!' },
  { id: 6, author: 'Faith', content: 'Try Vite for fast React dev.' },
  { id: 7, author: 'Gabe', content: 'TypeScript or JavaScript?' },
  { id: 8, author: 'Hannah', content: 'Stay hydrated 🚰' },
  { id: 9, author: 'Ivan', content: 'Working on my side project.' },
  { id: 10, author: 'Julia', content: 'Anyone up for coffee?' },
  { id: 11, author: 'Kyle', content: 'Deploying to the cloud!' },
  { id: 12, author: 'Liam', content: 'Music recommendations?' },
  { id: 13, author: 'Maya', content: 'Learning new things every day.' },
  { id: 14, author: 'Nina', content: 'Front-end or back-end?' },
  { id: 15, author: 'Omar', content: 'Let’s pair program.' },
];

// Protected DELETE endpoint
router.delete('/:id', authorize(['admin']), (req, res) => {
  res.json({ success: true, postId: req.params.id });
});


router.get('/', (req, res) => {
  let { page = 1, pageSize = 10 } = req.query;
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  // Paginate posts
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const posts = ALL_POSTS.slice(start, end);

  res.json({ posts });
});

module.exports = router;
