module.exports = {
	development:{
		fb:{
			appId:"599196556794501",
			appSecret:"79abedd921e9a72b79839c46d9092c83",
			url:"http://localhost:3000/"  //issue solved by adding a '/' at the end of localhost:3000 
											//referred to the link http://stackoverflow.com/questions/5001692/unable-to-get-access-token-from-facebook-got-an-oauthexception-says-error-vali
		},
		dbURL:"mongodb://localhost/test"
	}
}