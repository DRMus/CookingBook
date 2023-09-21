import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "../../utils/hooks/useQuery";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { Image, Rate, Spin, Typography } from "antd";
import { FireFilled } from "@ant-design/icons";

import emptyJpg from "../../assets/empty.jpg";

import "./Recipe.scss";
import "react-quill/dist/quill.snow.css";
import AuthUserHeart from "./AuthUserHeart";
import NotAuthUserHeart from "./NotAuthUserHeart";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { fetchOneRecipe, fetchUserLikes } from "../../redux/reducers/ActionCreators";
import { selectedRecipeSlice } from "../../redux/reducers/SelectedRecipeSlice";
import { makeTagIngredients } from "../../utils/makeTagIngredients";
import RecipeIngredientTag from "./RecipeIngredientTag";
import { SERVER_URL } from "../../core/axios";
import CreatorActions from "./CreatorActions";

const { Title, Paragraph } = Typography;

interface QueryParams {
  id: string;
}

const createSrcForImage = (filename: string | undefined): string => {
  if (!filename) {
    return emptyJpg;
  }
  return `${SERVER_URL}/${filename}`;
};

const Recipe = () => {
  const queryParams = useQuery<QueryParams>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthorized, decodedToken, token } = useAppSelector(
    (state) => state.authReducer
  );
  const { recipe, isLoading } = useAppSelector((state) => state.selectedRecipeReducer);

  const convertedIngredients = useMemo(
    () =>
      recipe
        ? makeTagIngredients(recipe?.ingredients, recipe?.alternate_ingredients)
        : [],
    [recipe]
  );

  const cookingOrderRef = useRef<HTMLElement>(null);

  const checkIsCreator = () => isAuthorized && decodedToken?.id === recipe?.user.id;

  const getRecipe = () => {
    if (!queryParams.id || isNaN(+queryParams.id)) {
      navigate("/");
      return;
    }
    dispatch(fetchOneRecipe(+queryParams.id));
  };

  const getUserLikes = () => {
    if (decodedToken) {
      dispatch(fetchUserLikes(decodedToken.id, token));
    }
  };

  const clearRecipe = () => {
    dispatch(selectedRecipeSlice.actions.recipeInit());
  };

  const setCookingOrderInHtml = () => {
    if (!cookingOrderRef.current || !recipe) return;
    cookingOrderRef.current.innerHTML = recipe.cooking_order;
  };

  useEffect(() => {
    setCookingOrderInHtml();
    getUserLikes();
  }, [recipe]);

  useEffect(() => {
    getRecipe();
    return () => {
      clearRecipe();
    };
  }, [queryParams]);

  return (
    <Content className="recipe-page">
      {checkIsCreator() && <CreatorActions />}
      <Spin tip="Загрузка..." spinning={isLoading}>
        <div className="recipe-page-main-content">
          <div className="recipe-page-image">
            <Image src={createSrcForImage(recipe?.image)} width={440} />
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
          <Paragraph ref={cookingOrderRef} />
        </div>
      </Spin>
    </Content>
  );
};

export default Recipe;
