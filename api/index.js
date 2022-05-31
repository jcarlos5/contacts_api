const express = require('express');
const config = require('../config.js');
const swaggerUi = require('swagger-ui-express');
const api_docs = require('./api_docs.json');
const error = require('../network/error');
const user = require('./services/user/network');
const auth = require('./services/auth/network');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api', swaggerUi.serve, swaggerUi.setup(api_docs));

app.use(error);

// INIT SERVER
app.listen(config.api.port, () => {
	console.log('[INFO]', 'API listening on port', config.api.port);
});
