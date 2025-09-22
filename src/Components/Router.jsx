import { Routes, Route } from "react-router";
// import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import PostDetails from "../Pages/PostDetails";
import { Navigate } from "react-router";
import MyBlogs from "../Pages/MyBlogs";
import CreatePost from "../Components/MyBlogs_Components/CreatePost";
import EditPost from "./MyBlogs_Components/EditPost";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../features/Posts/postsSlice.js";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

const Router = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  
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

        {/* Route for Privacy Policy */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Route for Terms of Service */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Route for About */}
        <Route path="/about" element={<About />} />

        {/* Route for Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Router;
