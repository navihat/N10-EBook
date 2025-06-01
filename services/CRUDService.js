// Thư mục này để lấy dữ liệu cho controllers
const connection = require('../config/database')

const getAllBooks = async () => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM books');
    return results; // Chỉ trả về dữ liệu
  } catch (error) {
    throw error;
  }
}

const getBookById = async (bookId) => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM books WHERE id_book = ?', [bookId]);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    getAllBooks, getBookById
}