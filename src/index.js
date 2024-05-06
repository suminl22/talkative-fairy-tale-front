import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./routes/Login";
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import Chat from './routes/Chat';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Login />
    ),
  },
  {
    path: "/signUp",
    element: (
      <SignUp />
    ),
  },
  {
    path: "/home",
    element: (
      <Home />
    ),
  },
  {
    path: "/chat",
    element: (
      <Chat />
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

