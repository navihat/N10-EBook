const session = require('express-session');

// Cấu hình session
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, // chuỗi bí mật dùng để mã hóa session
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 5, 
  }
});

module.exports = sessionMiddleware;