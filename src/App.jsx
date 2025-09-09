import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { getMode } from "./features/Colors/colorSlice.js";
import { useEffect } from "react";
import Router from "./Components/Router.jsx";

function App() {
  // Initialize Redux dispatch and selectors
  // to access color state and mode
  const dispatch = useDispatch();
  const bgColor = useSelector((state) => state.color.colors.bgColor);
  const textColor = useSelector((state) => state.color.colors.textColor);
  const mode = useSelector((state) => state.color.mode);

  // Effect to set the mode and colors based on localStorage
  // and update the Redux state accordingly
  useEffect(() => {
    if (localStorage.getItem("mode")) {
      dispatch(getMode(localStorage.getItem("mode")));
      document.body.style.backgroundColor = bgColor;
    } else {
      localStorage.setItem("mode", "light");
      dispatch(getMode("light"));
      document.body.style.backgroundColor = bgColor;
    }
  }, [mode, dispatch, bgColor, textColor]);

  // Render the main application component
  return (
    <>
      <Router />
    </>
  );
}

export default App;
