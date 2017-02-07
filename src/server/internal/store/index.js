import { graphql } from 'graphql';

function Schema(schema) {
	function query(query) {
		return graphql(schema, query);
	}

	return Object.freeze({
		query
	});
}

function Store(container) {

  function getSchema(name) {
    const schema = container.get(name);
		return Schema(schema);
  }

  return Object.freeze({
    getSchema
  });
}

Store.type = 'factory';

module.exports = Store;
