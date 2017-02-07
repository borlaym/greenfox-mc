var { graphql, buildSchema } = require('graphql');

function TestSchema() {
	const schema = buildSchema(`
	  type Query {
	    hello: String
	  }
	`);

	function query(query) {
		return graphql(schema, query, {
			hello: 'world',
			foo: 3
		});
	}

	return Object.freeze({
		query
	});

}

TestSchema.type = 'factory';
module.exports = TestSchema;
