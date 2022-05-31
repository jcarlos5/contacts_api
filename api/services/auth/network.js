const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// ENDPOINTS
router.post('/login', login);

// RESOLVERS
function login(req, res, next) {
	controller
		.login(req.body.username, req.body.password)
		.then((token) => response.success(req, res, token, 200))
		.catch(next);
}

module.exports = router;