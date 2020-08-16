var express = require('express');
var userModel = require.main.require('./models/user');
var employeeModel  = require.main.require('./models/employeeModel');
var { body, validationResult } = require('express-validator');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.username != null){
		res.render('employee/index',{uname : req.session.username});
	}else{
		res.redirect('/login');
	}
});

router.get('/myprofile', function(req, res){
	employeeModel.getemp(req.session.username , function(results){
		res.render('employee/myprofile',{user : results,uname : req.session.username});
	});
});

router.get('/updateprofile', function(req, res){
  employeeModel.getemp(req.session.username, function(result){
    res.render('employee/updateprofile', {user : result, uname : req.session.username});
  });
});


router.post('/update',[
	body('id').not().isEmpty().withMessage('Id cannot be empty'),
	body('name').not().isEmpty().withMessage('name cannot be empty'),
	body('uname').isLength({min : 8}).withMessage('username should be at least 8 character'),
	body('phone').not().isEmpty().withMessage('phone cannot be empty'),
	body('password').isLength({min : 8}).withMessage('password have to be at least 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/).withMessage('Passsword problem'),
], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){
		res.send("Something went wrong" + "<br>"
							+ "*no field can be empty" + "<br>"
							+ "username should be greater than 8 characters" + "<br>"
							+ "Password should be equal or greater than 8 character and \contains (A-Z, a-z, 0-9, and special sign like @,#,$,& etc)");
	}
	else{
		var user = {
			ID: req.body.id,
			name:req.body.name,
			uname: req.body.uname,
			phone:req.body.phone,
		};
		var login = {
			ID: req.body.id,
			uname: req.body.uname,
			password : req.body.password,
		};
	  employeeModel.updateemp(user, function(status){
	    if(status){
				userModel.updateemp(login, function(sta){
					if(sta){
							res.redirect('/login');
					}
					else{
						res.send('Something Went Wrong. Please try again')
					}
					});
	    }	else {
				res.send('Something Went Wrong. Please try again')
			}
	  });
  }
});

module.exports = router;
