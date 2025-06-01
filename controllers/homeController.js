// Xử lý sau khi nhận được req từ route
const connection = require('../config/database');
const { getAllBooks, getBookById } = require('../services/CRUDService');


const getHome = async (req, res) => {
    try {
    const books = await getAllBooks(); // tra ve toan bo sach de hien thi title va anh
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

const getReview = async (req, res) => {
  // Tra ve sach theo params
  const bookId = req.params.bookId;
  const bookById = await getBookById(bookId);
  console.log('>>> check bookId:', bookById);

  // Tra ve toan bo sach de hien thi sach goi y
    try {
    const books = await getAllBooks();
    res.render('pages/review', { books, bookById });
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu sách:', err);
    res.status(500).send('Lỗi máy chủ');
  }
}

module.exports = {
    getHome, getContact, getLogin, getRegister, getRead, getFavorvite, getUser, getReview,
}