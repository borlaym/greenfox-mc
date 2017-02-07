var { buildSchema } = require('graphql');

function TestSchema() {
	return buildSchema(`
	  type Query {
	    hello: String
	  }
	`);

}

TestSchema.type = 'factory';
module.exports = TestSchema;
