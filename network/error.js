const response = require('./response');

function error(err, req, res, next) {
    console.error('[ERROR]', err);

    const msg = err.message || 'Internal server error';
    const status = err.statusCode || 500;

    response.error(req, res, msg, status);
}

module.exports = error;