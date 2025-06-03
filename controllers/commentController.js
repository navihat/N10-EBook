const { getCommentById, getBookById, getUsersByBookId, getAllBooks } = require('../services/CRUDService');
const connection = require('../config/database');

const postAddComment = async (req, res) => {
    const userId = req.session.user.id_user;
    const { id_book, comment_text } = req.body;
    const date_created = new Date()
        .toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).split(' ')[0];
    const bookById = await getBookById(id_book);
    const commentById = await getCommentById(id_book)
    const fullnameUser = await getUsersByBookId(id_book);
    const books = await getAllBooks();

    try {
        await connection.query(
            `INSERT INTO comments (id_user, id_book, text, date_created) VALUES (?, ?, ?, ?)`,
            [userId, id_book, comment_text, date_created]
        );
        res.redirect(`/review/${id_book}`, { books, bookById, commentById, fullnameUser }, (err, html) => {
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
  const userId = req.session.user.id_user;
  const isAdmin = true;
  const { id_book, comment_id } = req.body;
  const bookById = await getBookById(id_book);
const commentById = await getCommentById(id_book);
const fullnameUser = await getUsersByBookId(id_book);
const books = await getAllBooks();

  try {
    // Xóa bình luận theo id_comment
    await connection.query(
      'DELETE FROM comments WHERE id_comment = ?',
      [comment_id]
    );

    // Render lại trang review với dữ liệu mới, truyền biến isAdmin xuống view
    res.redirect(`/review/${id_book}`, { books, bookById, commentById, fullnameUser, isAdmin }, (err, html) => {
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