// Xử lý sau khi nhận được req từ route
const { getAllBooks, getBookById, getFavorviteBook, getCommentById, getUsersByBookId } = require('../services/CRUDService');


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
  res.render('pages/contact');
}

const getLogin = (req, res) => {
  res.render('pages/login', { error: null });
}

const getRegister = (req, res) => {
  res.render('pages/register', { error: null });
}

const getRead = async (req, res) => {
  // Tra ve sach theo params
  const bookId = req.params.bookId;
  const bookById = await getBookById(bookId);

    try {
      res.render('pages/read', { bookById }, (err, html) => {
      if (err) return res.status(500).send("Lỗi render nội dung");

      // Nhúng layout, truyền biến title và content cho layout
      res.render('layout', {
        title: `Đọc sách`,
        content: html
      })
    });
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu sách:', err);
    res.status(500).send('Lỗi máy chủ');
  }
}

const getFavorvite = async (req, res) => {
  const userId = req.session.user.id_user;
  // console.log(">>>check user: ", userId);
  try {
    const bookByIdUser = await getFavorviteBook(userId);
    // console.log(">>>check book: ", bookByIdUser);
    res.render('pages/favorites', { bookByIdUser }, (err, html) => {
    if (err) return res.status(500).send("Lỗi render nội dung");

      // Nhúng layout, truyền biến title và content cho layout
      res.render('layout', {
        title: `Sách yêu thích của bạn`,
        content: html
      })
    });
  } catch(err) {
    console.error('Lỗi khi lấy dữ liệu sách:', err);
    res.status(500).send('Lỗi máy chủ');
  }
}

const getUser = (req, res) => {
  res.render('pages/user'); 
}

const getReview = async (req, res) => {
  // Tra ve sach theo params
  const bookId = req.params.bookId;
  const bookById = await getBookById(bookId);

  // Tra ve binh luan theo params
  const commentAndUserById = await getCommentById(bookId)

  const books = await getAllBooks();
  let isAdmin = false;

  if (req.session.user && req.session.user.role === 'admin') {
    isAdmin = true;
  }
  
    try {
    // Tra ve toan bo sach de hien thi sach goi y
    res.render('pages/review', { books, bookById, commentAndUserById, isAdmin }, (err, html) => {
      if (err) return res.status(500).send("Lỗi render nội dung");

      // Nhúng layout, truyền biến title và content cho layout
      res.render('layout', {
        title: `Chi tiết sách`,
        content: html
      })
    });
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu sách:', err);
    res.status(500).send('Lỗi máy chủ');
  }
}

module.exports = {
    getHome, getContact, getLogin, getRegister, getRead, getFavorvite, getUser, getReview,
}