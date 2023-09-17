import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import RecipesList from "./components/RecipesList/RecipesList";
import FavoriteRecipes from "./components/FavoriteRecipes/FavoriteRecipes";
import Recipe from "./components/Recipe/Recipe";
import SignInPage from "./components/AuthPage/SignInPage";
import SignUpPage from "./components/AuthPage/SignUpPage";

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
        { path: "recipe", element: <Recipe /> },
      ],
    },
    {
      path: "login",
      element: <SignInPage/>
    },
    {
      path: "registration",
      element: <SignUpPage/>
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
