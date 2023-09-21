import { useEffect, useState } from "react";
import { IRecipe } from "../../interfaces/IRecipe";
import { useUserAccess } from "../../utils/hooks/useUserAccess";
import RecipesTable from "../common/RecipesTable";
import { useAppSelector } from "../../utils/hooks/useAppDispatch";
import { getUserRecipes } from "../../utils/api/getUserRecipes";

const MyRecipes = () => {
  useUserAccess();

  const { decodedToken, token } = useAppSelector((state) => state.authReducer);

  const [userRecipesList, setUserRecipesList] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRecipes = async () => {
    if (!decodedToken) return;

    setIsLoading(true);
    const response = await getUserRecipes(decodedToken.id, token);

    setUserRecipesList(response || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getRecipes();
  }, [decodedToken]);

  return (
    <RecipesTable
      title={() => "Мои рецепты"}
      isSiderBrokeen={true}
      recipesList={userRecipesList}
      isLoading={isLoading}
    />
  );
};

export default MyRecipes;
