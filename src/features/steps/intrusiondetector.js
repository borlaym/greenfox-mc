'use strict';

import { expect } from 'chai';

export default function () {
  this.Then('I see "$count" requests in the "$schemaName" database', async function (count, schemaName) {
		async function handle() {
			const store = this.container.get('store');
			const schema = await store.getSchema(schemaName);
			const results = await schema.query(`{ intrusion { url } }`);
			console.log(results);
			expect(results.data.intrusion.length).to.equal(parseInt(count, 10));
		}
		if (this.context.promise) {
			this.context.promise.then(handle.bind(this));
		} else {
			handle.call(this);
		}
  });

	this.When('the system gets an Incoming insecure request', async function () {
		const queue = this.container.get('queue');
    const intrusiondetector = this.container.get('intrusiondetector');
    const queueName = 'intrusion-detection';

    const messageHandler = async (message) => {
      await intrusiondetector.processMessage(message);
    }

    this.context.promise = this.tools.getConsumePromise(queue, queueName, messageHandler);
	});

}
