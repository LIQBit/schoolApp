const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
    } = graphql;

//dummy data
var classes = [
    {name: '1FE1', year: 'J1', id: '1'},
    {name: '1FE2', year: 'J1', id: '2'},
    {name: '2FE', year: 'J2', id: '3'}
];

var students = [
    {name: 'Ken Hayashi', age: 13, test1: 68, id: '1'},
    {name: 'Taro Yamada', age: 12, test1: 87, id: '2'},
    {name: 'Jun Takeda', age: 14, test1: 34, id: '3'}
];

const ClassType = new GraphQLObjectType({
    name: 'Class',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        year: {type: GraphQLString}
    })
});

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        test1: {type: GraphQLInt}
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        class:{
            type: ClassType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                //code to get data from database/other source
                return _.find(classes, {id: args.id});
            }
        },
        student:{
            type: StudentType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(students, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});