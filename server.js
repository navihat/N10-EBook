require('dotenv').config()
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const connection = require('./config/database')

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME;

// cấu hình template engine
configViewEngine(app);

// khai báo route
app.use('/', webRoutes);

// simple querry
connection.query(
  'SELECT category FROM ebook.books;',
  function(err, results, fields) {
    console.log(results)
  }
)

// Middleware để parse body form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
