const { addFavoriteBook, removeFavoriteBook } = require('../services/CRUDService');

const postAddFavorite = async (req, res) => {
  const userId = req.session.user?.id_user;
  const bookId = req.body.id_book;
  if (!userId || !bookId) {
    return res.status(400).send("Thiếu thông tin người dùng hoặc sách.");
  }

  try {
    const results = await addFavoriteBook(userId, bookId);
    // console.log(">>> check results", results);
    res.redirect('/favorites'); // Hoặc chuyển hướng lại trang trước đó
  } catch (error) {
    console.error(error)
    res.status(500).send("Lỗi máy chủ khi thêm vào mục yêu thích.");
  }
};

const postRemoveFavorite = async (req, res) => {
  const userId = req.session.user?.id_user;
  const bookId = req.body.id_book;
  if (!userId || !bookId) {
    return res.status(400).send("Thiếu thông tin người dùng hoặc sách.");
  }

  try {
    const results = await removeFavoriteBook(userId, bookId);
    // console.log(">>> check results", results);
    res.redirect('/favorites'); // Hoặc chuyển hướng lại trang trước đó
  } catch (error) {
    console.error(error)
    res.status(500).send("Lỗi máy chủ khi xóa khỏi mục yêu thích.");
  }
};


module.exports = { postAddFavorite, postRemoveFavorite }
