import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import { useEffect } from "react";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";
import { verifyUser } from "./redux/actions/AuthActions";

function App() {
  const dispatch = useAppDispatch();

  /** При открытии приложения произовадится проверка авторизации */
  useEffect(() => {
    dispatch(verifyUser())
  }, [])
  return <RouterProvider router={routes} />;
}

export default App;
