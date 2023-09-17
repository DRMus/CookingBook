import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Divider,
  Form,
  Input,
  Radio,
  Slider,
  Space,
  Typography,
} from "antd";
import "./RecipesList.scss";
import RecipesTable from "./RecipesTable";
import { useState } from "react";

const { Text } = Typography;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Список ингредиентов",
    children: (
      <Form.Item name="ingredients">
        <Checkbox.Group className="recipes-sider-ingredients">
          <Checkbox value={"id1"}>Сахар</Checkbox>
          <Checkbox value={"id2"}>Мука</Checkbox>
          <Checkbox value={"id3"}>Соль</Checkbox>
          <Checkbox value={"id4"}>Яйца</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "2",
    label: "Сложность приготовления",
    children: (
      <Space className="recipes-sider-rate-slider">
        <Text>1</Text>
        <Form.Item name="rate" initialValue={[1, 5]}>
          <Slider min={1} max={5} range />
        </Form.Item>
        <Text>5</Text>
      </Space>
    ),
  },
  {
    key: "3",
    label: "Сортировка",
    children: (
      <Form.Item name="sortBy">
        <Radio.Group className="recipes-sider-radio-group">
          <Radio value={1}>По новизне</Radio>
          <Radio value={2}>По алфавиту</Radio>
          <Radio value={3}>По убыванию сложности</Radio>
          <Radio value={4}>По возрастанию сложности</Radio>
          <Radio value={5}>По количеству лайков</Radio>
        </Radio.Group>
      </Form.Item>
    ),
  },
];

const RecipesList = () => {
  const [isSiderBrokeen, setIsSiderBrokeen] = useState(false);

  const onBreakpoint = (brokeen: boolean) => {
    setIsSiderBrokeen(brokeen);
  };
  return (
    <>
      <Sider
        className="recipes-sider"
        width={250}
        collapsedWidth={0}
        breakpoint="lg"
        onBreakpoint={onBreakpoint}
      >
        <Form onFinish={(e) => console.log(e)}>
          <div className="recipes-sider-filters">
            <Form.Item name="search">
              <Input placeholder="Поиск" size="large" />
            </Form.Item>
            <Collapse items={items} />
          </div>
          <Form.Item className="recipes-sider-accept-button">
            <Button type="primary" size="large" htmlType="submit">
              Применить
            </Button>
          </Form.Item>
        </Form>
      </Sider>
      {!isSiderBrokeen && <Divider type="vertical" style={{ height: "100%" }} />}
      <Content>
        <RecipesTable />
      </Content>
    </>
  );
};

export default RecipesList;
