import { Space, message } from "antd";
import ClickableIcon from "../ui/ClickableIcon";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./CreatorActions.scss";
import { useAppSelector } from "../../utils/hooks/useAppDispatch";
import EditRecipeModal from "./EditRecipeModal";
import { useState } from "react";
import { makeRecipeFormData } from "../../utils/makeRecipeFormData";
import { deleteRecipe } from "../../utils/api/deleteRecipe";
import DeleteRecipeModal from "./DeleteRecipeModal";
import { useNavigate } from "react-router";

const CreatorActions = () => {
  const navigate = useNavigate();

  const { recipe } = useAppSelector((state) => state.selectedRecipeReducer);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const changeEditModalState = (state: boolean) => {
    setIsEditModalOpen(state);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const onDeleteModalOk = async () => {
    if (!recipe) return;
    setIsDeleteLoading(true);
    try {
      await deleteRecipe(recipe.id);
      navigate("/");
    } catch (e) {
      message.error("Что-то пошло не так");
    } finally {
      setIsDeleteLoading(false);
    }
    setIsDeleteModalOpen(false);
  };

  const onDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  return (
    <Space className="creator-actions">
      <ClickableIcon
        icon={<EditOutlined />}
        title="Изменить рецепт"
        type="text"
        style={{ border: "none" }}
        onClick={showEditModal}
      />
      <ClickableIcon
        icon={<DeleteOutlined />}
        title="Удалить рецепт"
        type="text"
        danger
        style={{ border: "none" }}
        onClick={showDeleteModal}
      />

      {recipe && (
        <EditRecipeModal
          recipeId={recipe.id}
          isModalOpen={isEditModalOpen}
          initialValues={makeRecipeFormData(recipe)}
          changeModalState={changeEditModalState}
        />
      )}
      <DeleteRecipeModal
        onCancel={onDeleteModalCancel}
        onOk={onDeleteModalOk}
        isLoading={isDeleteLoading}
        isModalOpen={isDeleteModalOpen}
      />
    </Space>
  );
};

export default CreatorActions;
