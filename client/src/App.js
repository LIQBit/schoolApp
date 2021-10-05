import React from "react";

import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";

function App() {
  return (
    <div id="main">
      <h1>Student Tracker</h1>
      <StudentList />
      <AddStudent />
    </div>
  );
}

export default App;
