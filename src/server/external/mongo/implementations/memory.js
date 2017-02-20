'use strict';

const mockgoose = require('mockgoose');
const mongoose = require('mongoose');

function MongoMemoryProvider() {
	mockgoose(mongoose);
	return mongoose;
}

module.exports = MongoMemoryProvider;
