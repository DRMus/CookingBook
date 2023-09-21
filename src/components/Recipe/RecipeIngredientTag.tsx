import { MoreOutlined } from "@ant-design/icons";
import { Popover, Tag, Typography } from "antd";
import { ITagIngredient } from "../../interfaces";

interface Props {
  ingredient: ITagIngredient;
}

const { Paragraph } = Typography;

const RecipeIngredientTag = ({ ingredient }: Props) => {
  /** Если альтернативных ингредиентов нет, то выводим обычный тэг*/
  if (
    !ingredient.altInredients ||
    ingredient.altInredients.names.length === 0 ||
    ingredient.altInredients.names[0] === ""
  ) {
    return <Tag style={{ margin: 3, cursor: "default" }}>{ingredient.name}</Tag>;
  }

  return (
    <Popover
      content={
        <Paragraph style={{ maxHeight: 150, overflow: "auto" }}>
          <ul>
            {ingredient.altInredients.names.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Paragraph>
      }
      title="Или же..."
    >
      <Tag style={{ margin: 3, cursor: "default" }} icon={<MoreOutlined />}>
        {ingredient.name}
      </Tag>
    </Popover>
  );
};

export default RecipeIngredientTag;
