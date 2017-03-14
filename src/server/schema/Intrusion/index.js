import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

const IntrusionType = new GraphQLObjectType({
  name: 'Intrusion',
  fields: {
    url: {
      type: GraphQLString,
    }
  }
});

const Message = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    message: {type: GraphQLString},
  }),
});

async function Intrusion(mongo) {
  const db = await mongo.getConnection();
  const requestSchema = db.Schema({ url: String });
  const IntrusionMongo = db.model('Intrusion', requestSchema);
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        intrusion: {
          type: new GraphQLList(IntrusionType),
          async resolve() {
            return await IntrusionMongo.find({});
          }
        }
      }
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        registerIntrusion: {
          type: Message,
          args: {
            url: {type: GraphQLString}
          },
          async resolve(parent, data) {
            const newIntrusion = new IntrusionMongo(data);
            const result = await newIntrusion.save();
            if (result._id) {
              return {message: 'Successful registration'};
            }
            return {error: 'Unsucccessful registration'};
          }
        }
      }
    })
  });
}

Intrusion.deps = ['mongo'];
module.exports = Intrusion;
