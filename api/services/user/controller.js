const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE_NAME = 'users';
const TABLE_FOLLOW_NAME = 'follows';

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

	async function upsert(body) {
		const user = {
			id: body.id || nanoid(),
			name: body.name,
		};

		if (body.username || body.password) {
			await auth.upsert({
				id: user.id,
				username: body.username,
				password: body.password,
			});
		}

		return store.upsert(TABLE_NAME, user);
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
		upsert,
		follow,
	};
};
