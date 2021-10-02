const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    } = graphql;

//dummy data
var classes = [
    {name: '1FE1', year: 'J1', id: '1'},
    {name: '1FE2', year: 'J1', id: '2'},
    {name: '2FE', year: 'J2', id: '3'}
];

var students = [
    {name: 'Ken Hayashi', age: 13, test1: 68, id: '1', classId: '1'},
    {name: 'Taro Yamada', age: 12, test1: 87, id: '2', classId: '2'},
    {name: 'Jun Takeda', age: 14, test1: 34, id: '3', classId: '3'},
    {name: 'Ren Kimura', age: 12, test1: 69, id: '4', classId: '1'},
    {name: 'Sho Mizuguchi', age: 13, test1: 91, id: '5', classId: '1'},
    {name: 'Shohei Tamura', age: 13, test1: 53, id: '6', classId: '2'},
    {name: 'Ryu Suzuki', age: 14, test1: 28, id: '7', classId: '3'},
];

const ClassType = new GraphQLObjectType({
    name: 'Class',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        year: {type: GraphQLString},
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                return _.filter(students, {classId: parent.id})
            }
        }
    })
});

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        test1: {type: GraphQLInt},
        class: {
            type: ClassType,
            resolve(parent, args){
                console.log(parent)
                return _.find(classes, {id: parent.classId})
            }
        }
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
        },
        students:{
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                return students
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            resolve(parent, args){
                return classes
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});