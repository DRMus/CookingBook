import { Button, Collapse, Form, Input } from "antd";
import { recipesFilterItems } from "./RecipesFilterItems";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { IFilters } from "../../interfaces";
import { fetchRecipesWithFilters } from "../../redux/actions/RecipesActions";

import "./RecipesList.scss"

const FiltersForm = () => {
  const dispatch = useAppDispatch();
  const { ingredientsList } = useAppSelector((state) => state.ingredientsReducer);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  const onValueChange = () => {
    setIsFormDirty(true);
  };

  const onFormFinish = (data: IFilters) => {
    dispatch(fetchRecipesWithFilters(data));
    setIsFormDirty(false);
  };
  return (
    <Form
      onFinish={onFormFinish}
      className="recipes-sider-form"
      onValuesChange={onValueChange}
    >
      <div className="recipes-sider-filters">
        <Form.Item name="search">
          <Input placeholder="Поиск" size="large" />
        </Form.Item>
        <Collapse items={recipesFilterItems(ingredientsList)} />
      </div>

      {isFormDirty && (
        <Form.Item className="recipes-sider-accept-button">
          <Button type="primary" size="large" htmlType="submit">
            Применить
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default FiltersForm;
