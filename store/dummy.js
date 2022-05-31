const db = {
	users: [{ id: '1', name: 'jcarlos' }],
};

async function list(table) {
	return db[table] || [];
}

async function get(table, id) {
	let collection = await db[table];
	return collection.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
	if (!db[table]) {
		db[table] = [];
	}
	db[table].push(data);
}

async function remove(table, id) {
	return true;
}

async function query(table, q) {
	let collection = await list(table);
	let key = Object.keys(q)[0];

	return collection.filter((item) => item[key] === q[key])[0] || null;
}

module.exports = {
	list,
	get,
	upsert,
	remove,
	query,
};
