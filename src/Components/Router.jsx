import { Routes, Route } from "react-router";
// import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import PostDetails from "../Pages/PostDetails";
import { Navigate } from "react-router";
import MyBlogs from "../Pages/MyBlogs";
import CreatePost from "../Components/MyBlogs_Components/CreatePost";
import EditPost from "./MyBlogs_Components/EditPost";
import { useDispatch } from "react-redux";
import { getPostById } from "../features/Posts/postsSlice.js";

const Router = () => {
  const dispatch = useDispatch();
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
          loader={({ params }) => {
            dispatch(getPostById(params.id));
          }}
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

        {/* Route for Creating Blog */}
        {user && <Route path="/create-blog" element={<CreatePost />} />}

        {/* Route for Editing Blog */}
        {user && <Route path="/edit-blog/:id" element={<EditPost />} />}

        {/* Redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Router;
