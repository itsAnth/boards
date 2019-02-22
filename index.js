////////////////////////////
///////Import Files/////////
////////////////////////////
var config = require('./config/config');
var app = require('./server/server');

app.listen(config.port, function() {
	console.log('Node app is running on port', config.port);
});