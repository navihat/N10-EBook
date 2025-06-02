const { getBookBySearch, getBookByCategory } = require('../services/CRUDService');

const queryBySearch = async (req, res) => {
    const keyword = req.query.search;
    // console.log('>>>req.query', req.query);
    try {
        const bookByQuery = await getBookBySearch(keyword);
        // console.log('>>>check bookByQuery', bookByQuery);
        res.render('pages/search', { bookByQuery, keyword }, (err, html) => {
        if (err) return res.status(500).send("Lỗi render nội dung");

        // Nhúng layout, truyền biến title và content cho layout
        res.render('layout', {
            title: `Tìm kiếm sách - ${keyword}`,
            content: html
            })
        });
    } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ khi tìm kiếm.');
  }
};


const queryByCategory = async (req, res) => {
    const keyword = req.query.category;
    // console.log('>>>req.query', req.query);
    try {
        const bookByQuery = await getBookByCategory(keyword);
        // console.log('>>>check bookByQuery', bookByQuery);
        res.render('pages/search', { bookByQuery, keyword }, (err, html) => {
        if (err) return res.status(500).send("Lỗi render nội dung");

        // Nhúng layout, truyền biến title và content cho layout
        res.render('layout', {
            title: `Tìm kiếm sách - ${keyword}`,
            content: html
            })
        });
    } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ khi tìm kiếm.');
  }
};


module.exports = { queryBySearch, queryByCategory }