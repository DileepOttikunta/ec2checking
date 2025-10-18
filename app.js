const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// MySQL (TiDB Cloud) connection
const db = mysql.createConnection({
  host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  user: 'QDhBxU8CP3GV9YY.root',      // your TiDB username
  password: '3wWW0BSZFRL9wXJ1',   // your TiDB password
  database: 'test',               // your database name
  port: 4000,                     // TiDB Cloud default port
  ssl: {
    rejectUnauthorized: true      // ensures secure connection
  }
});

// Connect to MySQL (TiDB)
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected securely to TiDB Cloud database');
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'write.html'));
});

// API to get data from database
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM students';  // Replace 'users' with your actual table
  db.query(query, (err, results) => {
    if (err) {
      console.error('⚠️ Error fetching data:', err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
