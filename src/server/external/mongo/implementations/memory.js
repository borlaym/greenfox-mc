'use strict';

const mockgoose = require('mockgoose');
const mongoose = require('mongoose');

function MongoMemoryProvider() {
	return mockgoose(mongoose).then(() => mongoose);
}

module.exports = MongoMemoryProvider;
