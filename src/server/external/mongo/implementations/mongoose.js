'use strict';

const mongoose = require('mongoose');

function MongoMemoryProvider() {
	return mongoose;
}

module.exports = MongoMemoryProvider;
