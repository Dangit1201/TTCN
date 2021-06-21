const checkLoginAdmin = (req, res, next) => {
    if (req.session.email_admin && req.session.pass_admin) {
      return res.redirect("/admin");
    }
    next(); // sau khi xu ly xong ben tren se next chuyen den controller
  };
  
  const checkAdmin = (req, res, next) => {
    if (!req.session.email_admin || !req.session.pass_admin) {
      return res.redirect("/login");
    }
    next();
  };
  
  module.exports = {
    checkLoginAdmin: checkLoginAdmin,
    checkAdmin: checkAdmin,
  };
  