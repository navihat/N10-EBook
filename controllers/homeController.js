// Xử lý sau khi nhận được req từ route
const connection = require('../config/database');
const { getAllBooks } = require('../services/CRUDService');

const path = require('path');


const getHome = async (req, res) => {
    try {
    const books = await getAllBooks();
    res.render('pages/home', { books });
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu sách:', err);
    res.status(500).send('Lỗi máy chủ');
  }
}

const getContact = (req, res) => {
  res.render('pages/contact'); // views/pages/contact.ejs
}

const getLogin = (req, res) => {
  res.render('pages/login', { error: null });
}

const getRegister = (req, res) => {
  res.render('pages/register', { error: null });
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

module.exports = {
    getHome, getContact, getLogin, getRegister, getRead, getFavorvite, getUser, getContent,
}