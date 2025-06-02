// nếu đã đăng nhập
const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
    res.send(`
        <script>
            alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
            window.location.href = '/login';
        </script>
    `);
};


// phân quyền admin
const ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Bạn không có quyền truy cập!');
};

module.exports = { ensureAuthenticated, ensureAdmin };