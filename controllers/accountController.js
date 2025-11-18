// Xử lý login và register
const connection = require("../config/database");
const { getUserInformation } = require("../services/CRUDService");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_ROUND || "10");

const postRegister = async (req, res) => {
  // lấy dữ liệu từ post
  const {
    username,
    email,
    fullname,
    id_user,
    sex,
    address,
    password,
    confirmPassword,
  } = req.body;
  const date_created = new Date()
    .toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" })
    .split(" ")[0];
  const role = "user";

  if (password !== confirmPassword) {
    return res.render("pages/register", {
      error: "Mật khẩu không trùng khớp",
    });
  }

  try {
    // kiểm tra xem người dùng đã tồn tại hay chưa
    const [existingUsers] = await connection.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );

    // kiểm tra xem người dùng có tồn tại chưa
    if (existingUsers.length > 0) {
      return res.render("pages/register", {
        error: "Username hoặc email đã tồn tại!",
      });
    }

    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // chèn data vào DB
    await connection.query(
      `INSERT INTO users (id_user, username, email, fullname, sex, address, password, date_created, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_user,
        username,
        email,
        fullname,
        sex,
        address,
        hashedPassword,
        date_created,
        role,
      ]
    );

    return res.render("pages/login", {
      error: "Tạo tài khoàn thành công, hãy đăng nhập.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi máy chủ.");
  }
};

const postLogin = async (req, res) => {
  // lấy dữ liệu từ post
  const { username, password } = req.body;

  try {
    const [correctUser] = await connection.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    console.log(">>> check postLogin:", correctUser);

    // so sánh mật khẩu đã mã hóa
    const isMatch = await bcrypt.compare(password, correctUser[0].password);

    if (correctUser.length > 0) {
      if (isMatch) {
        req.session.user = correctUser[0];
        res.redirect("/");
      } else {
        res.render("pages/login", { error: "Mật khẩu không đúng" });
      }
    } else {
      res.render("pages/login", { error: "Tên đăng nhập không đúng" });
    }
  } catch (err) {
    console.error(err);
    res.render("pages/login", { error: "Lỗi hệ thống" });
  }
};

const getAccountPage = async (req, res) => {
  // lấy dữ liệu người dùng từ session
  const user = await getUserInformation(req.session.user.id_user);

  try {
    res.render("pages/user", { user }, (err, html) => {
      if (err) {
        console.error("Check error:", err);
        return res.status(500).send("Lỗi render nội dung");
      }
      // Nhúng layout, truyền biến title và content cho layout
      res.render("layout", {
        title: `Thông tin tài khoản`,
        content: html,
      });
    });
  } catch (err) {
    console.error("Lỗi khi lấy thông tin tài khoản:", err);
    res.status(500).send("Lỗi máy chủ");
  }
};

const getLogout = async (req, res) => {
  // xóa session mỗi khi đăng xuất
  req.session.destroy((err) => {
    if (err) {
      console.log("Lỗi khi xóa session:", err);
      return res.status(500).send("Đã xảy ra lỗi khi đăng xuất.");
    }
    res.redirect("/login");
  });
};

module.exports = {
  postRegister,
  postLogin,
  getAccountPage,
  getLogout,
};
