import { Button, Form, FormListFieldData, Input } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import "./RecipeForm.scss";

interface Props {
  index: number;
  filed: FormListFieldData;
  filedsLength: number;
  remove: (index: number | number[]) => void;
}

const IngredientRow = ({ filed, index, filedsLength, remove }: Props) => {
  return (
    <div className="create-recipe-form-ingredients-list-item">
      <Form.Item
        wrapperCol={{ span: 30 }}
        key={filed.key + "ing"}
        name={[filed.name, "ingredient"]}
        rules={[{ required: true, message: "Это обязательное поле" }]}
      >
        <Input placeholder="Название ингредиента" />
      </Form.Item>
      <Form.Item
        key={filed.key + "altIng"}
        wrapperCol={{ span: 30 }}
        name={[filed.name, "alternate_ingredient"]}
      >
        <Input placeholder="Алтернативные ингредиенты" />
      </Form.Item>
      <Button
        type="primary"
        disabled={filedsLength === 1}
        danger
        ghost
        onClick={() => remove(index)}
      >
        <MinusOutlined />
      </Button>
    </div>
  );
};

export default IngredientRow;
