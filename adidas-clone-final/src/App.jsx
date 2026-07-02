import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./features/theme/themeSlice";

function App() {
  const theme = useSelector(
    (state) => state.theme.mode
  );

  const dispatch = useDispatch();

  return (
    <div
      style={{
        backgroundColor:
          theme === "light"
            ? "white"
            : "black",

        color:
          theme === "light"
            ? "black"
            : "white",

        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1>Redux Toolkit Demo</h1>

      <h2>Current Theme: {theme}</h2>

      <button
        onClick={() =>
          dispatch(toggleTheme())
        }
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;