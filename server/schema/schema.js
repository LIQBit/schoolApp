const graphql = require('graphql');
const _ = require('lodash');
const Student = require('../models/students');
const Class = require('../models/classes');
const classes = require('../models/classes');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql;


const ClassType = new GraphQLObjectType({
    name: 'Class',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        year: {type: GraphQLString},
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                //return _.filter(students, {classId: parent.id})
                return Student.find({classId:parent.id});
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
        //classId: {type: GraphQLString},
        class: {
            type: ClassType,
            resolve(parent, args){
                console.log(parent)
                //return _.find(classes, {id: parent.classId})
                return Class.findById(parent.classId);
                
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
                //return _.find(classes, {id: args.id});
                return Class.findById(args.id);
            }
        },
        student:{
            type: StudentType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(students, {id: args.id})
                return Student.findById(args.id);
            }
        },
        students:{
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                //return students
                return Student.find({});
                
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            resolve(parent, args){
                //return classes
                return Class.find({});
                
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                test1: {type: new GraphQLNonNull(GraphQLInt)},
                classId: {type: new GraphQLNonNull(GraphQLID)}

            },
            resolve(parent, args){
                let student = new Student({
                    name: args.name,
                    age: args.age,
                    test1: args.test1,
                    classId: args.classId
                });
                console.log(student)
                return student.save();
            }
        },
        addClass: {
            type: ClassType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                year: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let newclass = new Class({
                    name: args.name,
                    year: args.year
                });
                return newclass.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});