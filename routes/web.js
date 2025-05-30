const express = require('express');
const router = express.Router();
const {getHome, getContact, getLogin, getRead, getFavorvite, getUser, getRegister} = require('../controllers/homeController')

// Trang chủ
router.get('/', getHome);

// Trang liên hệ
router.get('/contact', getContact);

// Trang đăng nhập
router.get('/login', getLogin);

// Trang danh sách sách
router.get('/read', getRead);

// Trang yêu thích
router.get('/favorites', getFavorvite);

// Trang thông tin người dùng
router.get('/user', getUser);

// Trang đăng ký
router.get('/register', getRegister);


module.exports = router