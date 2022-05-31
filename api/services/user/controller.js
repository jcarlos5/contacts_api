const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE_NAME = 'users';
const TABLE_FOLLOW_NAME = 'follows';

function getUserFromBody(body) {
	return {
		id: body.id || nanoid(),
		name: body.name,
	};
}

module.exports = function (injected_store) {
	let store = injected_store;

	if (!store) {
		const config = require('../../../config');
		store = require('../../../store/' + config.store.main);
	}

	function list() {
		return store.list(TABLE_NAME);
	}

	function get(id) {
		return store.get(TABLE_NAME, id);
	}

	function insert(body) {
		const user = getUserFromBody(body);
		if (body.username || body.password) {
			return auth
				.insert({
					id: user.id,
					username: body.username,
					password: body.password,
				})
				.then((_result) => {
					store.insert(TABLE_NAME, user);
				});
		}

		return store.insert(TABLE_NAME, user);
	}

	function update(body) {
		const user = getUserFromBody(body);

		if (body.username || body.password) {
			return auth
				.update({
					id: user.id,
					username: body.username,
					password: body.password,
				})
				.then((_result) => {
					store.update(TABLE_NAME, user);
				});
		}

		return store.update(TABLE_NAME, user);
	}

	function follow(from, to) {
		return store.upsert(TABLE_FOLLOW_NAME, {
			from: from,
			to: to,
		});
	}

	return {
		list,
		get,
		insert,
		update,
		follow,
	};
};
