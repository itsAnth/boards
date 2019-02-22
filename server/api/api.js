var router = require('express').Router();
var controller = require('./controller');


router.route('/').get(controller.home);

router.route('*').all(function(req, res) {
	var oRes = {
		success: false,
		payload: {
			error: "Invalid path."
		}
	};
	var sResponse = JSON.stringify(oRes);
	res.type('json');
	res.status(401).send(sResponse);
});

module.exports = router;