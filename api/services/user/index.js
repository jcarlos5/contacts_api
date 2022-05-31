const config = require('../../../config');
const store = require('../../../store/' + config.store.main);
const controller = require('./controller');

module.exports = controller(store);
