const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../../config');
const error = require('../../../utils/error');

function sign(data) {
	return jwt.sign(data, config.jwt.secret);
}

function verify(token) {
	return jwt.verify(token, config.jwt.secret);
}

function getToken(auth) {
	if (!auth) throw error('No has token', 400);
	if (auth.indexOf('Bearer ', '')) return error('Invalid authorization', 400);

	return auth.replace('Bearer ', '');
}

function decodeHeader(req) {
	const authorization = req.headers.authorization || '';
	const token = getToken(authorization);
	const decoded = verify(token);

	req.user = decoded;

	return decoded;
}

async function hash(pass, salt) {
	return await bcrypt.hash(pass, salt);
}

function compare(hash, pass) {
	return new Promise((callback) => {
		bcrypt.compare(pass, hash).then((res) => {
			callback(res);
		});
	});
}

const check = {
	own: (req, owner) => {
		const data = decodeHeader(req);
		if (data.id !== owner) {
			throw error('No permissions', 403);
		}
	},
	logged: (req, owner) => {
		const data = decodeHeader(req);
	},
};

module.exports = {
	sign,
	hash,
	compare,
	check,
};
