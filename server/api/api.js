var router = require('express').Router();
var controller = require('./controller');

router.param('term', controller.params);

router.route('/success').get(controller.success);

//router.route('/id/:term').get(controller.getId);

router.route('/checkout/:term').get(controller.checkout);

router.route('/charge').post(controller.charge);

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