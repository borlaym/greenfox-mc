'use strict';

import { expect } from 'chai';

export default function () {
  this.When('a request comes in to "$url"', async function (endpoint) {
    const requestCounter = this.container.get('requestCounter');
    await requestCounter.registerIncomingRequest(endpoint, {}, Date.now());
  });

  this.Then('I get "$value" for the total number of requests', async function (value) {
		const requestCounter = this.container.get('requestCounter');
    const result = await requestCounter.getStatistic();
    expect(result.totalIncomingRequests).to.eql(parseInt(value));
  });
}
