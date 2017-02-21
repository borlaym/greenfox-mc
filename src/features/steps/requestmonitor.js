'use strict';

import { expect } from 'chai';

const sampleRequest = {
	url: '/randomurl',
	params: {},
	time: '3123121'
};

export default function () {
  this.When('the system get an Incoming request', async function () {
    const monitor = this.container.get('requestmonitor');
    await monitor.registerIncomingRequest(sampleRequest.url, sampleRequest.params, sampleRequest.time);
  });

  this.Then('I see "$value" for "$key" in the statistics', async function(value, key) {
    const monitor = this.container.get('requestmonitor');
    const result = await monitor.getStatistics();
    expect(result[key]).to.eql(parseInt(value));
  });

	this.When('I try to get all requests from the request monitor', async function () {
  });

  this.Then('it returns the request in an array', async function() {
    const monitor = this.container.get('requestmonitor');
    const result = await monitor.getRequests();
    expect(result.length).to.eql(1);
		expect(result[0].url).to.eq(sampleRequest.url);
		expect(result[0].time).to.eq(sampleRequest.time);
  });
}
