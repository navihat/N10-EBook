const { getCommentById, getBookById, getUsersByBookId, getAllBooks } = require('../services/CRUDService');
const connection = require('../config/database');

const postAddComment = async (req, res) => {
    // Dữ liệu nhập vào DB
    const userId = req.session.user.id_user;
    const { id_book, rating, comment_text } = req.body;
    const date_created = new Date()
        .toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).split(' ')[0];

    // sách ở phần đầu tiên
    const bookById = await getBookById(id_book);

    // Bình luận
    const userEmail = req.session.user.email;
    const commentAndUserById = await getCommentById(id_book);

    // Sách gợi ý
    const books = await getAllBooks();

    try {
        await connection.query(
            `INSERT INTO comments (id_user, id_book, text, date_created, rating) VALUES (?, ?, ?, ?, ?)`,
            [userId, id_book, comment_text, date_created, rating]
        );
        res.redirect(`/review/${id_book}`, { books, bookById, commentAndUserById, userEmail }, (err, html) => {
            if (err) return res.status(500).send("Lỗi render nội dung");

            // Nhúng layout, truyền biến title và content cho layout
            res.render('layout', {
                title: `Chi tiết sách`,
                content: html
            })
        });
    } catch (error) {
        console.error(error)
        res.status(500).send("Lỗi máy chủ khi thêm bình luận.");
    }
}

const postRemoveComment = async (req, res) => {
  let isAdmin = true;
  const { id_book, comment_id } = req.body;
  const bookById = await getBookById(id_book);
  const commentAndUserById = await getCommentById(id_book);
  const books = await getAllBooks();

  try {
    // Xóa bình luận theo id_comment
    await connection.query(
      'DELETE FROM comments WHERE id_comment = ?',
      [comment_id]
    );

    // Render lại trang review với dữ liệu mới, truyền biến isAdmin xuống view
    res.redirect(`/review/${id_book}`, { books, bookById, commentAndUserById, isAdmin }, (err, html) => {
        if (err) return res.status(500).send("Lỗi render nội dung");

        // Nhúng layout, truyền biến title và content cho layout
        res.render('layout', {
            title: `Chi tiết sách`,
            content: html
        })
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi máy chủ khi xóa bình luận.');
  }
};


module.exports = { postAddComment, postRemoveComment }