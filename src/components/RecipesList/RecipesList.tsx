import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Divider,
  Input,
  Radio,
  Slider,
  Space,
  Typography
} from "antd";
import "./RecipesList.scss";
import RecipesTable from "./RecipesTable";

const {Text} = Typography;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Список ингредиентов",
    children: (
      <Space direction="vertical" className="recipes-sider-ingredients">
        <Checkbox>Сахар</Checkbox>
        <Checkbox>Мука</Checkbox>
        <Checkbox>Соль</Checkbox>
        <Checkbox>Яйца</Checkbox>
      </Space>
    ),
  },
  {
    key: "2",
    label: "Сложность приготовления",
    children: 
    <Space className="recipes-sider-rate-slider">
      <Text>1</Text>
      <Slider min={1} max={5} range defaultValue={[1, 5]}/>
      <Text>5</Text>
    </Space>
    ,
  },
  {
    key: "3",
    label: "Сортировка",
    children: (
      <Radio.Group className="recipes-sider-radio-group">
        <Radio value={1}>По новизне</Radio>
        <Radio value={2}>По алфавиту</Radio>
        <Radio value={3}>По убыванию сложности</Radio>
        <Radio value={4}>По возрастанию сложности</Radio>
        <Radio value={5}>По количеству лайков</Radio>
      </Radio.Group>
    ),
  },
];

const RecipesList = () => {
  return (
    <>
      <Sider className="recipes-sider" width={250}>
        <div className="recipes-sider-filters">
          <Input placeholder="Поиск" size="large" />
          <Collapse items={items} />
        </div>
        <Button className="recipes-sider-accept-button" type="primary" size="large">
          Применить
        </Button>
      </Sider>
      <Divider type="vertical" style={{ height: "100%" }} />
      <Content>
        <RecipesTable/>
      </Content>
    </>
  );
};

export default RecipesList;
