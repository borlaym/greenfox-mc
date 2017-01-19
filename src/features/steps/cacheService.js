'use strict';

import { assert } from 'chai';

export default function() {
	this.When('I request the key', function(done) {
		const cacheService = this.container.get('cacheService');
		this.context.cacheService = cacheService;
		done();
	});

  this.Then('I get the amount', function(callback) {
    const value = this.context.cacheService.get('foo');
		assert.equal(value, 0);
    callback();
  });

	this.When(/^I can increment a value$/, function (callback) {
		let value = this.context.cacheService.increment('foo', 5);
		assert.equal(value, 5);
		callback();
   });
}
