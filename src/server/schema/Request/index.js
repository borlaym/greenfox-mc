import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
		GraphQLNonNull,
		GraphQLList
} from 'graphql';

const RequestType = new GraphQLObjectType({
	name: 'RequestType',
	description: 'Any request on the server',
	fields: () => ({
		url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The url',
    },
		time: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The time',
    }
	})
});

const QueryType = (request) => new GraphQLObjectType({
	name: 'QueryType',
	fields: {
		requests: {
			type: new GraphQLList(RequestType),
			resolve: () => {
				return new Promise(resolve => {
					request.find((err, results) => {
						resolve(results);
					});
				})
			}
		}
	}
});

const MutationType = (request) => new GraphQLObjectType({
	name: 'MutationType',
	fields: {
		add: {
			type: RequestType,
			args: {
				url: {
					type: new GraphQLNonNull(GraphQLString),
					name: 'url'
				},
				time: {
					type: new GraphQLNonNull(GraphQLString),
					name: 'time'
				}
			},
			resolve: (root, args) => {
				const newRequest = new request({
					url: args.url,
					time: args.time
				});
				return new Promise((resolve, reject) => {
					newRequest.save(err => {
						if (err) {
							return reject(err);
						}
						resolve(newRequest);
					});
				})
			}
		}
	}
});

async function Request(container) {
	const mongoose = await container.mongo;
	const request = mongoose.model('Request', {
		url: String,
		time: String
	});
  return new GraphQLSchema({
    query: QueryType(request),
		mutation: MutationType(request),
		types: [RequestType]
  });
}
Request.type = 'factory';
module.exports = Request;
