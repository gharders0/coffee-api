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
      description: 'List of All Coffees',
      resolve: () => Drink.find(),
    },
    drink: {
      type: DrinkType,
      description: 'A single coffee',
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
    // removeCoffee: {
    //   type: CoffeeType,
    //   description: 'Remove a coffee drink',
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLInt) },
    //   },
    //   resolve: (parent, args) => {
    //     Coffees = Coffees.filter((coffee) => coffee.id !== args.id);
    //     return Coffees[args.id];
    //   },
    // },
    // updateCoffee: {
    //   type: CoffeeType,
    //   description: 'Update a coffee drink',
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLInt) },
    //     name: { type: new GraphQLNonNull(GraphQLString) },
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
