import { Button, Space } from "antd";

import "./AddRecipeButton.scss";
import CreateRecipeModal from "./CreateRecipeModal/CreateRecipeModal";
import { useState } from "react";

const AddRecipeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const changeModalState = (state: boolean) => {
    setIsModalOpen(state);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Space className="add-recipe-container">
        <Button type="primary" onClick={openModal}>
          Создать рецепт
        </Button>
      </Space>
      <CreateRecipeModal isModalOpen={isModalOpen} changeModalState={changeModalState} />
    </>
  );
};

export default AddRecipeButton;
