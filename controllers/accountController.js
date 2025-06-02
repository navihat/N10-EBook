// Xử lý login và register
const connection = require('../config/database');
const { getUserInformation } = require('../services/CRUDService');

const postRegister = async (req, res) => {
  const { username, email, fullname, id_user, sex, address, password, confirmPassword } = req.body;
  // console.log(">>> check req.body:", req.body)
  const date_created = new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).split(' ')[0];
  const role = 'user';

  if (password != confirmPassword) { 
    return res.render('pages/register', {
      error: 'Mật khẩu không trùng khớp',
    })
  }

  try {
    const [existingUsers] = await connection.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`, [username, email]
    )

    if (existingUsers.length > 0) {
      return res.render('pages/register', { error: 'Username hoặc email đã tồn tại!',});
    }

    await connection.query(
      `INSERT INTO users (id_user, username, email, fullname, sex, address, password, date_created, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_user, username, email, fullname, sex, address, password, date_created, role]
    );
    return res.render('pages/login', { error: 'Tạo tài khoàn thành công, hãy đăng nhập.',});  
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi máy chủ.")
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [correctUser] = await connection.query(
      `SELECT * FROM users WHERE username = ? AND password = ?`, [username, password],
    )

    if (correctUser.length > 0) {
      req.session.user = correctUser[0];
      // console.log(">>>check req.session", req.session);
      res.redirect('/');
    } else {
      res.render('pages/login', {error: 'Email hoặc mật khẩu không đúng'})
    }
  } catch(err) {
    console.error(err);
    res.render('pages/login', {error: 'Lỗi hệ thống'})
  }
}

const getAccountPage = async (req, res) => {

  const user = await getUserInformation(req.session.user.id_user);

  try {
    res.render('pages/user', { user }, (err, html) => {
      if (err) {
        console.error("Check error:", err);
        return res.status(500).send("Lỗi render nội dung");
      }
      // Nhúng layout, truyền biến title và content cho layout
      res.render('layout', {
        title: `Thông tin tài khoản`,
        content: html
      })
    });
  } catch (err) {
    console.error('Lỗi khi lấy thông tin tài khoản:', err);
    res.status(500).send('Lỗi máy chủ');
  }
};

const getLogout = async (req, res) => {
  // xóa session mỗi khi đăng xuất
  req.session.destroy(err => {
    if (err) {
      console.log('Lỗi khi xóa session:', err);
      return res.status(500).send('Đã xảy ra lỗi khi đăng xuất.');
    }
    res.redirect('/login');
  });
};

module.exports = {
    postRegister, postLogin, getAccountPage, getLogout
}