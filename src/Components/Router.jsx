import { Routes, Route } from "react-router";
// import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import PostDetails from "../Pages/PostDetails";
import { Navigate } from "react-router";
import MyBlogs from "../Pages/MyBlogs";

const Router = () => {
  const user = document.cookie.includes("user=");
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

        {/* <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        /> */}

        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />

        {/* Route for Post Details */}
        <Route
          path="/post/:id"
          element={
            <>
              <PostDetails />
            </>
          }
        />

        {/*Route for MyBlogs */}
        {user && (
          <Route
            path="/my-blogs"
            element={
              <>
                <MyBlogs />
              </>
            }
          />
        )}

        {/* Redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Router;
