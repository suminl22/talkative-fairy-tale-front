import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route
} from "react-router-dom";
import Login from "./routes/Login";
import SignUp from './routes/SignUp';
import Home from './routes/Home';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/">
        <Login />
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
