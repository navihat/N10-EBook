const connection = require('../config/database');


const getHome = (req, res) => {
    res.render('pages/home'); // views/pages/home.ejs
}

const getContact = (req, res) => {
  res.render('pages/contact'); // views/pages/contact.ejs
}

const getLogin = (req, res) => {
  res.render('pages/login'); // views/pages/login.ejs
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

const getRegister = (req, res) => {
  res.render('pages/register'); // views/pages/user
}

module.exports = {
    getHome, getContact, getLogin, getRead, getFavorvite, getUser, getRegister
}