var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
  var user = {
		uname: req.body.uname,
		password: req.body.password
	};

  userModel.validate(user, function(status){
		if(status){
			req.session.username = user.uname;
			userModel.get(user.uname, function(result){
				if (result.role == 1){
					res.redirect('/admin');
				}
				else if (result.role == 2){
					res.redirect('/employee');
				}
			});
		}else{
      res.send('invalid username or password')
		}
	});

});

module.exports = router;
