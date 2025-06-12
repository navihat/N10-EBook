const { addFavoriteBook, removeFavoriteBook } = require('../services/CRUDService');

const postAddFavorite = async (req, res) => {
  // từ session để lấy user id và từ post lấy book id
  const userId = req.session.user?.id_user;
  const bookId = req.body.id_book;
  // gửi lỗi
  if (!userId || !bookId) {
    return res.status(400).send("Thiếu thông tin người dùng hoặc sách.");
  }

  try {
    await addFavoriteBook(userId, bookId); // thêm vào database
    res.redirect('/favorites'); // Hoặc chuyển hướng lại trang trước đó
  } catch (error) {
    console.error(error)
    res.status(500).send("Lỗi máy chủ khi thêm vào mục yêu thích.");
  }
};

const postRemoveFavorite = async (req, res) => {
  // từ session để lấy user id và từ post lấy book id
  const userId = req.session.user?.id_user;
  const bookId = req.body.id_book;
  if (!userId || !bookId) {
    return res.status(400).send("Thiếu thông tin người dùng hoặc sách.");
  }

  try {
    // remove sách yêu thích
    await removeFavoriteBook(userId, bookId);
    // console.log(">>> check results", results);
    res.redirect('/favorites'); // Hoặc chuyển hướng lại trang trước đó
  } catch (error) {
    console.error(error)
    res.status(500).send("Lỗi máy chủ khi xóa khỏi mục yêu thích.");
  }
};


module.exports = { postAddFavorite, postRemoveFavorite }
