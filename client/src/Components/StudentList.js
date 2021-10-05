import React from "react";
import { useQuery } from "@apollo/client";
import { getStudents } from "../queries/queries";


const StudentList=()=> {
    const {loading,error,data} = useQuery(getStudents);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return (
      <div>
          <ul id="student-list">
            {data.students.map(student=>(
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
      </div>
    );
  }
  
export default StudentList;