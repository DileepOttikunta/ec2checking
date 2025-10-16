const express = require('express');
const app = express();
const PORT = 3000;

// Simple API route
app.get('/', (req, res) => {
  res.send('Hello Dileep! 🚀 Your Node.js app is live!');
});

// Run server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
