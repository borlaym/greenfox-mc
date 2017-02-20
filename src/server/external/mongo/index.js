'use strict';

async function Mongo(container) {
	console.log(container.get('config').get('cache'));
  const implementationName = container.get('config').get(Mongo.serviceName);
	const mongoose = container.getImplementation(Mongo.serviceName, implementationName);
	return new Promise(resolve => {
		mongoose.connect('mongodb://localhost:27017/hello', err => {
			if (err) {
				console.log(err);
			}
			return resolve(mongoose);
		});
	});
}

Mongo.type = 'factory';
module.exports = Mongo;
