/// Điều hướng trang, GET và POST
const express = require('express');
const router = express.Router();
const {
    getHome, getContact, getLogin, getRead, getFavorvite, getUser, getRegister, getReview,
} = require('../controllers/homeController');

const { 
    postLogin, postRegister, getAccountPage, getLogout
} = require('../controllers/accountController');

const { 
    ensureAuthenticated, ensureAdmin 
} = require('../middleware/auth');

const { 
    queryBySearch, queryByCategory
} = require('../controllers/queryController');

const { 
    postAddFavorite, 
} = require('../controllers/favoriteController');

const { 
    postFeedback, 
} = require('../controllers/feedbackController');


// Trang chủ
router.get('/', getHome);

// Trang liên hệ
router.get('/contact', getContact);

// Trang đăng nhập
router.get('/login', getLogin);

// Trang đăng ký
router.get('/register', getRegister);

// Trang nội dung sách
router.get('/read/:bookId', getRead);

// Trang yêu thích
router.get('/favorites', ensureAuthenticated, getFavorvite);

// Trang thông tin người dùng
router.get('/user', ensureAuthenticated, getAccountPage);

// Trang thông tin về sách
router.get('/review/:bookId', getReview);

// Logout để xóa session sau đó chuyển đến /login
router.get('/logout', getLogout);

// Post trang register
router.post('/register', postRegister);

// Post trang login
router.post('/login', postLogin);

// Trang tìm kiếm bằng chữ tay và thể loại
router.get('/search', (req, res, next) => {
  if (req.query.search) {
    return queryBySearch(req, res);
  } else if (req.query.category) {
    return queryByCategory(req, res);
  }
});

// Thêm yêu thích
router.post('/favorite-add', ensureAuthenticated, postAddFavorite);

// Xóa yêu thích

// Post trang phản hồi
router.post('/feedback', ensureAuthenticated, postFeedback);

// Post bình luận
// router.post("/comment-add");

module.exports = router