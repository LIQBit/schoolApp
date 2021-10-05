import { gql } from "@apollo/client";

const getStudents = gql`
  {
    students {
      name
      id
    }
  }
`;

const getClassesQuery = gql`
  {
    classes {
      name
      id
    }
  }
`;

const addStudentMutation = gql`
  mutation addStudent(
    $name: String!
    $age: String!
    $classId: ID!
    $test1: String!
  ) {
    addStudent(name: $name, age: $age, classId: $classId, test1: $test1) {
      name
    }
  }
`;

export { getClassesQuery, getStudents, addStudentMutation };
