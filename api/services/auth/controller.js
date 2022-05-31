const auth = require('./utils');
const error = require('../../../utils/error');

const TABLE_NAME = 'credentials';

async function getCredentialFromBody(body) {
	const credential = { id: body.id };

	if (body.username) credential.username = body.username;
	if (body.password) credential.password = await auth.hash(body.password, 5);

	return credential;
}

module.exports = function (injected_store) {
	let store = injected_store;

	if (!store) {
		const config = require('../../../config');
		store = require('../../../store/' + config.store.main);
	}

	function insert(body) {
		return getCredentialFromBody(body).then((credential) => {
			return new Promise((resolve, reject) => {
				store
					.insert(TABLE_NAME, credential)
					.then((result) => resolve(result))
					.catch((error) => reject(error));
			});
		});
	}

	function update(body) {
		return getCredentialFromBody(body).then((credential) => {
			return new Promise((resolve, reject) => {
				store
					.update(TABLE_NAME, credential)
					.then((result) => resolve(result))
					.catch((error) => reject(error));
			});
		});
	}

	async function login(username, password) {
		const credentials = await store.query(TABLE_NAME, { username: username });
		if (!credentials) throw error('Invalid credentials', 401);

		return auth.compare(credentials.password, password).then((is_correct) => {
			if (is_correct) {
				return auth.sign(JSON.parse(JSON.stringify(credentials)));
			} else {
				throw error('Invalid credentials', 401);
			}
		});
	}

	return {
		insert,
		update,
		login,
	};
};
