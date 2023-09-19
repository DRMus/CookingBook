import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Button, Collapse, Divider, Form, Input } from "antd";
import "./RecipesList.scss";
import RecipesTable from "./RecipesTable";
import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/useAppDispatch";
import { fetchIngredients } from "../../redux/reducers/ActionCreators";
import { recipesFilterItems } from "./RecipesFilterItems";

const RecipesList = () => {
  const dispatch = useAppDispatch();
  const { ingredientsList, isLoading } = useAppSelector(
    (state) => state.ingredientsReducer
  );

  const [isSiderBrokeen, setIsSiderBrokeen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  const onValueChange = () => {
    setIsFormDirty(true);
  };

  const onFormFinish = (e: any) => {
    console.log(e);
    setIsFormDirty(false);
  };

  const onBreakpoint = (brokeen: boolean) => {
    setIsSiderBrokeen(brokeen);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

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
      </Sider>

      {!isSiderBrokeen && (
        <Divider type="vertical" style={{ height: "100%" }} />
      )}

      <Content>
        <RecipesTable isSiderBrokeen={isSiderBrokeen} />
      </Content>
    </>
  );
};

export default RecipesList;
