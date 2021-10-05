import { gql } from "@apollo/client";

const getStudents = gql`
  {
    students{
      name
      id
    }
  }
`;

const getClassesQuery = gql`
  {
    classes{
      name
      id
    }
  }
`;

const addStudentMutation = gql`
  mutation addStudent($name: String!, $age: Int!, $classId: ID!) {
    addStudent(name: $name, age: $age, classId: $classId){
        name
    }
  }
`;

export {getClassesQuery, getStudents,addStudentMutation};