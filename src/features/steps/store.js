'use strict';

import { expect } from 'chai';

export default function () {
  this.When('I ask for schema definition "$schemaName"', async function (schemaName) {
    const store = this.container.get('store');
		this.context.TestSchema = store.getSchema(schemaName);
  });

  this.Then('I can run a query on it', async function () {
		const expectedResult = {
			hello: 'world'
		};
		const result = await this.context.TestSchema.query(` { hello } `);
    expect(result).to.eql(expectedResult);
  });
}
