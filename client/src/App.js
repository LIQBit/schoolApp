import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";

//Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Student Tracker</h1>
        <StudentList />
        <AddStudent />
      </div>
    </ApolloProvider>
  );
}

export default App;
