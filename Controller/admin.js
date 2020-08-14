var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.username != null){
		res.render('admin/index');
	}else{
		res.redirect('/login');
	}

});

router.post('/', function(req, res){
	if(req.body.option == 'Add employee')
	{
		res.redirect('/admin/addemployee');
	}
	else if (req.body.option == 'All employees list') {
		res.redirect('/admin/allemployeeslist');
	}
});

module.exports = router;
