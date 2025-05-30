const express = require('express');
const router = express.Router();
const {
    getHome, getContact, getLogin, getRead, getFavorvite, getUser, getRegister, getContent,
    postLogin,
} = require('../controllers/homeController')

// Trang chủ
router.get('/', getHome);

// Trang liên hệ
router.get('/contact', getContact);

// Trang đăng nhập
router.get('/login', getLogin);

// Trang đăng ký
router.get('/register', getRegister);

// Trang nội dung sách
router.get('/read', getRead);

// Trang yêu thích
router.get('/favorites', getFavorvite);

// Trang thông tin người dùng
router.get('/user', getUser);

// Trang thông tin về sách
router.get('/content', getContent);

// Post trang login
router.post('/login', postLogin);

module.exports = router