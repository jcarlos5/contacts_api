const mysql = require('mysql');
const config = require('../config');

const db_conf = {
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
};

// INIT CONNECTION
let connection;

function handleConnection() {
	connection = mysql.createConnection(db_conf);

	connection.connect((err) => {
		if (err) {
			console.error('[ERROR]', err);
			setTimeout(handleConnection, config.mysql.reconection_time);
		} else {
			console.log('[INFO]', 'Database connected');
		}
	});

	connection.on('error', (err) => {
		console.error('[ERROR]', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleConnection();
		}
	});
}

handleConnection();

function list(table) {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table}`, (error, data) => {
			if (error) return reject(error);
			resolve(data);
		});
	});
}

function get(table, id) {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
			if (error) return reject(error);
			resolve(data);
		});
	});
}

function insert(table, data) {
	return new Promise((resolve, reject) => {
		connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
}

function update(table, data) {
	return new Promise((resolve, reject) => {
		connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
}

function query(table, q, join) {
	let join_query = '';
	if (join) {
		for (const key in join) {
			join_query += `JOIN ${key} ON ${join[key]} = ${key}.id `;
		}
	}

	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table} ${join_query} WHERE ?`, q, (error, data) => {
			if (error) return reject(error);
			resolve(data[0] || null);
		});
	});
}

module.exports = {
	list,
	get,
	insert,
	update,
	query,
};
