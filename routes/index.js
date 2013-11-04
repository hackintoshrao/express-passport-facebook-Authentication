
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'InterestShip' });
};

exports.loggedin = function(req,res){
	res.render('loggedin',{title:'Welcome To InterestShip',user:req.user});//req.user is an array , use Jade looping at fetch all the values in it 
};