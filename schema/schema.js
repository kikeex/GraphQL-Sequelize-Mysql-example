import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import Db from '../db';

const userModel = new GraphQLObjectType({
    name: 'Users',
    description: 'This represents a User',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(users) {
                    return users.id;
                },
            },
            firstName: {
                type: GraphQLString,
                resolve(users) {
                    return users.firstName;
                },
            },
            lastName: {
                type: GraphQLString,
                resolve(users) {
                    return users.lastName;
                },
            },
            email: {
                type: GraphQLString,
                resolve(users) {
                    return users.email;
                },
            },
        };
    },
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            users: {
                type: new GraphQLList(userModel),
                args: {
                    id: {
                        type: GraphQLInt,
                    },
                },
                resolve(root, args) {
                    return Db.models.users.findAll({ where: args });
                },
            },
        };
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields() {
        return {
            addUser: {
                type: userModel,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt),
                    },
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                },
                resolve(source, args) {
                    return Db.models.users.create({
                        id: args.id,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase(),
                    });
                },
            },
        };
    },
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

export default Schema;
