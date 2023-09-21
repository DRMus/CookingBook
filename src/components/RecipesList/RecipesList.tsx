import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Divider, message } from "antd";
import RecipesTable from "../common/RecipesTable";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { fetchIngredients, fetchRecipes } from "../../redux/reducers/ActionCreators";
import AddRecipeButton from "./AddRecipeButton";
import FiltersForm from "./FiltersForm";

import "./RecipesList.scss";

const RecipesList = () => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.authReducer);
  const {
    recipesList,
    isLoading: isRecipesLoading,
    error,
  } = useAppSelector((state) => state.recipesReducer);

  const [isSiderBrokeen, setIsSiderBrokeen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const onBreakpoint = (brokeen: boolean) => {
    setIsSiderBrokeen(brokeen);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchRecipes());
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <>
      <Sider
        className={classNames("recipes-sider", {
          "absolute-sider": isSiderBrokeen,
          "delete-padding": isCollapsed,
          "add-padding-right": isSiderBrokeen && !isCollapsed,
        })}
        width={250}
        collapsedWidth={0}
        breakpoint="lg"
        onBreakpoint={onBreakpoint}
        onCollapse={setIsCollapsed}
      >
        <FiltersForm />
      </Sider>

      {!isSiderBrokeen && <Divider type="vertical" style={{ height: "100%" }} />}

      <Content>
        {isAuthorized && <AddRecipeButton />}
        <RecipesTable
          isSiderBrokeen={isSiderBrokeen}
          isLoading={isRecipesLoading}
          recipesList={recipesList}
        />
      </Content>
    </>
  );
};

export default RecipesList;
