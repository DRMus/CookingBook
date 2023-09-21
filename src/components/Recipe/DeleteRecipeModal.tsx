import { Modal } from "antd";

interface Props {
  onCancel: () => void;
  onOk: () => void;
  isModalOpen: boolean;
  isLoading: boolean;
}

const DeleteRecipeModal = ({ isLoading, isModalOpen, onCancel, onOk }: Props) => {
  return (
    <Modal
      title="Удаление рецепта"
      open={isModalOpen}
      onCancel={onCancel}
      onOk={onOk}
      okButtonProps={{ loading: isLoading }}
    >
      Вы уверены, что хотите удалить данный рецепт?
    </Modal>
  );
};

export default DeleteRecipeModal;
