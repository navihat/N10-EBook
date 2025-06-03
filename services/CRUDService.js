// Thư mục này để lấy dữ liệu cho controllers
const connection = require('../config/database')

// lay toan bo sach
const getAllBooks = async () => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM books');
    return results;
  } catch (error) {
    throw error;
  }
}

// lay 1 sach theo params
const getBookById = async (bookId) => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM books WHERE id_book = ?', [bookId]);
    return results;
  } catch (error) {
    throw error;
  }
}

// lay thong tin nguoi dung voi dau vao la session
const getUserInformation = async (userId) => {
  try {
    const [results, fileds] = await connection.query('SELECT * FROM users WHERE id_user = ?', [userId])
    return results;
  } catch (error) {
    throw error;
  }
}

// lấy thông tin sách theo tìm kiếm
const getBookBySearch = async (query) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT * FROM books WHERE category LIKE ? OR summary LIKE ? OR title LIKE ? OR author LIKE ?`, 
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`])
    return results;
  } catch (error) {
    throw error;
  }
}

// lấy thông tin sách theo thể loại
const getBookByCategory = async (query) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT * FROM books WHERE category LIKE ?`, 
      [query])
    return results;
  } catch (error) {
    throw error;
  }
}

// lấy các sách yêu thích từ csdl
const getFavorviteBook = async (userId) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT books.*
      FROM books
      JOIN favorites ON books.id_book = favorites.id_book
      WHERE favorites.id_user = ?
    `, [userId]
    )
    return results;
  } catch (error) {
    throw error;
  }
}
// thêm sách yêu thích
const addFavoriteBook = async (userId, bookId) => {
  try {
      const [results, fields] = await connection.query(
        'SELECT * FROM favorites WHERE id_user = ? AND id_book = ?',
        [userId, bookId]
      );

      if (results.length > 0) {
        return { success: false, message: 'Đã tồn tại trong mục yêu thích.' };
      }

      // Thêm vào bảng favorites
      await connection.query(
        'INSERT INTO favorites (id_user, id_book) VALUES (?, ?)',
        [userId, bookId]
      );  

      return { success: true, message: 'Đã thêm vào mục yêu thích.' };
    } catch (error) {
      throw error;
    }
}

// xóa yêu thích
const removeFavoriteBook = async (userId, bookId) => {
  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM favorites WHERE id_user = ? AND id_book = ?',
      [userId, bookId]
    );

    if (results.length === 0) {
      return { success: false, message: 'Sách không tồn tại trong mục yêu thích.' };
    }

    // Xóa khỏi bảng favorites
    await connection.query(
      'DELETE FROM favorites WHERE id_user = ? AND id_book = ?',
      [userId, bookId]
    );

    return { success: true, message: 'Đã xóa khỏi mục yêu thích.' };
  } catch (error) {
    throw error;
  }
}

// lấy ra các bình luận cua sach
const getCommentById = async (bookId) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT * FROM comments WHERE id_book = ? ORDER BY date_created DESC;`,
      [bookId]
    );
    return results;
  } catch (error) {
    throw error;
  }
}

// Lấy thông tin người dùng từ bookId
const getUsersByBookId = async (bookId) => {
  try {
    const [results, fields] = await connection.query(
      `SELECT DISTINCT u.*
       FROM users u
       JOIN comments c ON u.id_user = c.id_user
       WHERE c.id_book = ?`,
      [bookId]
    );
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getAllBooks, getBookById, getUserInformation, getBookBySearch, getBookByCategory, 
    getFavorviteBook, addFavoriteBook, getCommentById, getUsersByBookId, removeFavoriteBook
}