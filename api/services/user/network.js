const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// ENDPOINTS
router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.put('/', secure('update'), update);

router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);

// RESOLVERS
function list(req, res, next) {
	controller
		.list()
		.then((user_list) => {
			response.success(req, res, user_list, 200);
		})
		.catch(next);
}

function get(req, res, next) {
	controller
		.get(req.params.id)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
}

function insert(req, res, next) {
	controller
		.insert(req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
}

function update(req, res, next) {
	controller
		.update(req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
}

function follow(req, res, next) {
	controller
		.follow(req.user.id, req.params.id)
		.then((data) => response.success(req, res, data, 201))
		.catch(next);
}

function following(req, res, next) {
	controller
		.following(req.params.id)
		.then((data) => response.success(req, res, data, 200))
		.catch(next);
}

module.exports = router;
