/// Điều hướng trang, GET và POST
const express = require('express');
const router = express.Router();
const {
    getHome, getContact, getLogin, getRead, getFavorvite, getUser, getRegister, getContent,
} = require('../controllers/homeController');

const { 
    postLogin, postRegister, getAccountPage,
} = require('../controllers/accountController');

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
router.get('/user', getAccountPage);

// Trang thông tin về sách
router.get('/content', getContent);

// Post trang login
router.post('/register', postRegister);

router.post('/login', postLogin);

module.exports = router