import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

function TestSchema() {

	return new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'RootQueryType',
			fields: {
				hello: {
					type: GraphQLString,
					resolve() {
						return 'world';
					}
				}
			}
		})
	});

}

TestSchema.type = 'factory';
module.exports = TestSchema;
