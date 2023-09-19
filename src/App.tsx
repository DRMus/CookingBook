import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import { useEffect } from "react";
import { verifyUser } from "./redux/reducers/ActionCreators";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyUser())
  }, [])
  return <RouterProvider router={routes} />;
}

export default App;
