const dotenv = require('dotenv').config();

module.exports = {
	api: {
		port: process.env.API_PORT || 3000,
	},
	store: {
		main: process.env.STORE_MAIN || 'mysql',
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	mysql: {
		host: process.env.MYSQL_HOST || '',
		user: process.env.MYSQL_USER || '',
		password: process.env.MYSQL_PASS || '',
		database: process.env.MYSQL_DB || '',
		reconection_time: process.env.MYSQL_RECONECTION_TIME || 2000,
	},
};
