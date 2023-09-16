import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import RecipesList from "./components/RecipesList/RecipesList";
import FavoriteRecipes from "./components/FavoriteRecipes/FavoriteREcipes";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <RecipesList />,
        },
        {
          path: "favorite",
          element: <FavoriteRecipes />,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
