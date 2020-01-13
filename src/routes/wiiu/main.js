const router = require('express').Router();
const logger = require('../../logger');

router.get('/geisha', function(request, response) {
	response.render('home', {layout: false});
});

router.get('/geisha/about', function(request, response) {
	response.render('about', {layout: false});
});

module.exports = router;