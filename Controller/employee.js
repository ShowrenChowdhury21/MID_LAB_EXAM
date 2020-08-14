var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.username != null){
		res.render('employee/index');
	}else{
		res.redirect('/login');
	}
});

router.post('/', function(req, res){
	if(req.body.option == 'My profile')
	{
		res.redirect('/employee/myprofile');
	}
	else if (req.body.option == 'Update profile') {
		res.redirect('/employee/updateprofile');
	}
});

module.exports = router;
