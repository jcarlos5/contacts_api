const auth = require('./utils');
const error = require('../../../utils/error');

const TABLE_NAME = 'credentials';

module.exports = function (injected_store) {
	let store = injected_store;

	if (!store) {
		const config = require('../../../config');
		store = require('../../../store/' + config.store.main);
	}

	async function upsert(body) {
		const credentials = {
			id: body.id,
		};

		if (body.username) credentials.username = body.username;
		if (body.password) credentials.password = await auth.hash(body.password, 5);

		return store.upsert(TABLE_NAME, credentials);
	}

	async function login(username, password) {
		const credentials = await store.query(TABLE_NAME, { username: username });
		if(!credentials) throw error('Invalid credentials', 401);
		
		return auth.compare(credentials.password, password).then((is_correct) => {
			if (is_correct) {
				return auth.sign(JSON.parse(JSON.stringify(credentials)));
			} else {
				throw error('Invalid credentials', 401);
			}
		});
	}

	return {
		upsert,
		login,
	};
};
