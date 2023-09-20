import { Button, Form, Input, Modal, Select, Space, Typography } from "antd";

import "./CreateRecipeModal.scss";
import { useState } from "react";

interface Props {
  isModalOpen: boolean;
  changeModalState: (state: boolean) => void;
}

const {Text} = Typography

const CreateRecipeModal = ({ isModalOpen, changeModalState }: Props) => {
  const [form] = Form.useForm();

  const [ingredientsList, setIngredientsList] = useState([
    { ingredient: "Сахар", alternate_ingredient: "Сахар, Мука" },
  ]);

  const handleCancel = () => {
    changeModalState(false);
  };
  return (
    <Modal title="Создание рецепта" open={isModalOpen} onCancel={handleCancel}>
      <Form form={form} onFinish={(e) => console.log(e)}>
        <Form.List name="some" initialValue={ingredientsList}>
          {(fileds, { remove }) => (
            <div>
              {fileds.map((field, index) => (
                <Space>
                  <Form.Item label={index + 1} key={field.key + "ing"} name={[field.name, "ingredient"]}>
                    <Input placeholder="Название ингредиента" />
                  </Form.Item>
                  <Form.Item key={field.key + "altIng"} name={[field.name, "alternate_ingredient"]}>
                    <Input placeholder="Алтернативные ингредиенты" />
                  </Form.Item>
                </Space>
              ))}
            </div>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRecipeModal;
