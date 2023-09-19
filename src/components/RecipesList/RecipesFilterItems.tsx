import {
  Typography,
  CollapseProps,
  Form,
  Checkbox,
  Space,
  Slider,
  Radio,
} from "antd";
import { IIngredient } from "../../interfaces/IRecipe";

const { Text } = Typography;
type RecipesFilter = (ingredientsList: IIngredient[]) => CollapseProps["items"];

export const recipesFilterItems: RecipesFilter = (ingredientsList) => [
  {
    key: "1",
    label: "Список ингредиентов",
    children: (
      <Form.Item name="ingredients">
        <Checkbox.Group className="recipes-sider-ingredients">
          {ingredientsList.map((item) => (
            <Checkbox key={item.id} value={item.name}>{item.name}</Checkbox>
          ))}
          
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
