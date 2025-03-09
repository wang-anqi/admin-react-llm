import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../views/Layout/index";
import Login from "../views/Login";
import TableShow from "../views/DataShow/tablePage";
import CollapseShow from "../views/DataShow/collapsePage";
import FromBasic from "../views/FormShow/formBasic";
import FromStep from "../views/FormShow/formStep";
import NavStep from "../views/NavShow/stepShow";
import HomePage from "../views/HomeShow/homePage";
import User from "../views/User";

// createBrowserRouter：history路由
const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="home" replace></Navigate>,
      },
      {
        path: "home",
        element: <HomePage></HomePage>,
      },
      {
        path: "user",
        element: <User></User>,
      },
      {
        path: "show/table",
        element: <TableShow></TableShow>,
      },
      {
        path: "show/collapse",
        element: <CollapseShow></CollapseShow>,
      },
      {
        path: "form/basic",
        element: <FromBasic></FromBasic>,
      },
      {
        path: "form/step",
        element: <FromStep></FromStep>,
      },
      {
        path: "nav/step",
        element: <NavStep></NavStep>,
      },
    ],
  },
  {
    path: "/login",

    element: <Login />,
  },
]);

export default router;
