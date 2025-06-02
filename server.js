require('dotenv').config()
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const sessionMiddleware = require('./config/session');

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME;

// config session
app.use(sessionMiddleware);

// config req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cấu hình template engine
configViewEngine(app);

// khai báo route
app.use('/', webRoutes);

// Middleware để parse body form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
