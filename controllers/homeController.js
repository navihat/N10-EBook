const connection = require('../config/database');


const getHome = (req, res) => {
    res.render('pages/home'); // views/pages/home.ejs
}

const getContact = (req, res) => {
  res.render('pages/contact'); // views/pages/contact.ejs
}

const getLogin = (req, res) => {
  res.render('pages/login', { backUrl: '/register' }); // views/pages/login.ejs
}

const getRegister = (req, res) => {
  res.render('pages/register', { backUrl: '/register' }); // views/pages/register.ejs
}

const getRead = (req, res) => {
  res.render('pages/read');
}

const getFavorvite = (req, res) => {
  res.render('pages/favorites'); // views/pages/favorites
}

const getUser = (req, res) => {
  res.render('pages/user'); // views/pages/user
}

const getContent = (req, res) => {
  res.render('pages/content');
}

const postLogin = (req, res) => {
  res.send("du ma may");
  console.log(">>> check req.body", req.body);
}

module.exports = {
    getHome, getContact, getLogin, getRead, getFavorvite, getUser, getRegister, getContent,
    postLogin,
}