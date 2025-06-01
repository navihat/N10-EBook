// Thư mục này để lấy dữ liệu cho controllers
const connection = require('../config/database')

const getAllBooks = async () => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM books');
    return results;
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

const getUserInformation = async (userId) => {
  try {
    const [results, fileds] = await connection.query('SELECT username, email FROM users WHERE id_user = ?', [userId])
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    getAllBooks, getBookById, getUserInformation
}