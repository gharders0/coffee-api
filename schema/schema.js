const graphql = require('graphql');
const DrinkType = require('../types.js');
const _ = require('lodash');
const Drink = require('../models/drink');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    drinks: {
      type: new GraphQLList(DrinkType),
      description: 'List of All Drinks',
      resolve: () => Drink.find(),
    },
    drink: {
      type: DrinkType,
      description: 'A single drink',
      args: {
        name: { type: GraphQLString },
      },
      resolve: (parent, args) => Drink.findById(args.id),
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addNewDrink: {
      type: DrinkType,
      description: 'Add new drink',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        calories: { type: GraphQLNonNull(GraphQLInt) },
        ingredients: { type: GraphQLList(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const drink = new Drink({
          name: args.name,
          calories: args.calories,
          ingredients: args.ingredients,
          country: args.country,
        });
        return drink.save();
      },
    },
    removeDrink: {
      type: DrinkType,
      description: 'Remove a coffee drink',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        Drink.deleteOne({ name: args.name });
      },
    },
    // TODO: update method...
    // updateDrink: {
    //   type: DrinkType,
    //   description: 'Update a coffee drink',
    //   args: {
    //     name: { type: new GraphQLNonNull(GraphQLString) },
    //     calories: { type: GraphQLInt },
    //     ingredients: { type: GraphQLList },
    //     country: { type: GraphQLString },
    //   },
    //   resolve: (parent, args) => {
    //     Coffees[args.id - 1].name = args.name;
    //     return Coffees[args.id - 1];
    //   },
    // },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
