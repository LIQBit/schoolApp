const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const ClassType = new GraphQLObjectType({
    name: 'Class',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        year: {type: GraphQLString}
    })
});