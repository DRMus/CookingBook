import { useEffect, useMemo, useState } from "react";
import { useQuery } from "../../utils/hooks/useQuery";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { Image, Popover, Rate, Tag, Typography } from "antd";
import { FireFilled, MoreOutlined } from "@ant-design/icons";

import emptyJpg from "../../assets/empty.jpg";

import "./Recipe.scss";
import "react-quill/dist/quill.snow.css";
import AuthUserHeart from "./AuthUserHeart";
import NotAuthUserHeart from "./NotAuthUserHeart";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { fetchOneRecipe } from "../../redux/reducers/ActionCreators";
import { selectedRecipeSlice } from "../../redux/reducers/SelectedRecipeSlice";
import { makeTagIngredients } from "../../utils/makeTagIngredients";
import RecipeIngredientTag from "./RecipeIngredientTag";

const { Title, Paragraph, Text } = Typography;

interface QueryParams {
  id: string;
}

const Recipe = () => {
  const queryParams = useQuery<QueryParams>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.authReducer);
  const { recipe, isLoading } = useAppSelector((state) => state.selectedRecipeReducer);

  const convertedIngredients = useMemo(
    () =>
      recipe
        ? makeTagIngredients(recipe?.ingredients, recipe?.alternate_ingredients)
        : [],
    [recipe]
  );

  const getRecipe = () => {
    if (!queryParams.id || isNaN(+queryParams.id)) {
      navigate("/");
      return;
    }
    dispatch(fetchOneRecipe(+queryParams.id));
  };

  const clearRecipe = () => {
    dispatch(selectedRecipeSlice.actions.recipeInit());
  };

  useEffect(() => {
    getRecipe();
    return () => {
      clearRecipe();
    };
  }, [queryParams]);

  return (
    <Content className="recipe-page">
      <div className="recipe-page-main-content">
        <div className="recipe-page-image">
          <Image src={recipe?.image?.toString() || emptyJpg} width={440} />
        </div>
        <Typography>
          <div className="recipe-page-main-content-title">
            <Title>{recipe?.title}</Title>
            {isAuthorized && <AuthUserHeart />}
            {!isAuthorized && <NotAuthUserHeart />}
          </div>

          <Rate
            disabled
            value={recipe?.difficulty}
            character={<FireFilled />}
            className="recipe-page-rate"
          />
          <Title level={4}>Описание</Title>
          <Paragraph>{recipe?.description}</Paragraph>
          <Title level={4}>Ингредиенты</Title>
          <div>
            {convertedIngredients.map((item) => (
              <RecipeIngredientTag key={item.id} ingredient={item} />
            ))}
          </div>
        </Typography>
      </div>
      <div style={{ marginTop: 30 }}>
        <Title level={2}>Этапы приготовления</Title>
        <Paragraph>
          <Text>{recipe?.cooking_order}</Text>
        </Paragraph>
      </div>
    </Content>
  );
};

export default Recipe;
