import { Routes, Route } from "react-router";
import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";
import Dashboard from "../Pages/Dashboard.jsx";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
