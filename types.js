const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const DrinkType = new GraphQLObjectType({
  name: 'Drink',
  description: 'Represents different drinks you can order',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    calories: { type: GraphQLNonNull(GraphQLInt) },
    ingredients: { type: GraphQLList(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = DrinkType;
