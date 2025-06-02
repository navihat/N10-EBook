const connection = require('../config/database');

const postFeedback = async (req, res) => {
    const userId = req.session.user.id_user;
    const { fullname, email, feedback_text } = req.body;
    const date_created = new Date()
        .toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).split(' ')[0];
    // console.log(">>> check fullname", req.body);
    // console.log(">>> check email", email);
    // console.log(">>> check feedback", feedback);
    // console.log(">>> check date_created", date_created);

    try {
        await connection.query(
            `INSERT INTO feedbacks (id_user, text, date_created, fullname, email) VALUES (?, ?, ?, ?, ?)`,
            [userId, feedback_text, date_created, fullname, email]
        );
        return res.render('pages/contact');
    } catch (error) {
        console.error(error)
        res.status(500).send("Lỗi máy chủ khi thêm vào mục yêu thích.");
    }
}

module.exports = { postFeedback }