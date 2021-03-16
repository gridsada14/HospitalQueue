var express = require('express');
var router = express.Router();

/* GET users listing. */
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/hospital#login-box-container')
  }
  next()
}

router.get('/ticket', isLoggedIn, function(req, res, next) {
  res.render('ticket');
});
// ,{ title: 'Express', user: req.session.user }


module.exports = router;
