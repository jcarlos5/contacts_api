exports.success = function (req, res, data, status) {
	let local_status = status || 200;
	let local_data = data || '';

	res.status(local_status).send({
		error: false,
		status: local_status,
		data: local_data,
	});
};

exports.error = function (req, res, data, status) {
	let local_status = status || 500;
	let local_data = data || 'Internal server error';

	res.status(local_status).send({
		error: true,
		status: local_status,
		data: local_data,
	});
};
