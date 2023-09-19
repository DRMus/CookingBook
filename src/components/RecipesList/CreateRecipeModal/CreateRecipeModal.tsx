import { Button, Form, Input, Modal } from "antd";

import "./CreateRecipeModal.scss";

interface Props {
  isModalOpen: boolean;
  changeModalState: (state: boolean) => void;
}

const CreateRecipeModal = ({ isModalOpen, changeModalState }: Props) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    changeModalState(false);
  };
  return (
    <Modal title="Создание рецепта" open={isModalOpen} onCancel={handleCancel}>
      <Form form={form} onFinish={(e) => console.log(e)}>
        <Form.List name="some" initialValue={["1", "2"]}>
          {(fields) => (
            <div>
              {fields.map((field) => (
                <Form.Item {...field}>
                  <Input />
                </Form.Item>
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
