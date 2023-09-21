import { message, Form, Button, Modal } from "antd";
import { ICreateRecipe } from "../../interfaces/IRecipe";
import { fetchOneRecipe } from "../../redux/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { makeRecipeRequestData } from "../../utils/makeRecipeRequestData";
import { useMemo, useState } from "react";
import RecipeForm from "../common/RecipeForm/RecipeForm";
import { updateRecipe } from "../../utils/api/updateRecipe";

interface Props {
  recipeId: number;
  isModalOpen: boolean;
  initialValues: ICreateRecipe;
  changeModalState: (state: boolean) => void;
}

const EditRecipeModal = ({
  recipeId,
  isModalOpen,
  initialValues,
  changeModalState,
}: Props) => {
  const [form] = Form.useForm<ICreateRecipe>();

  const dispatch = useAppDispatch();
  const { decodedToken } = useAppSelector((state) => state.authReducer);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormFinished = async (data: ICreateRecipe) => {
    if (!decodedToken) return;

    setIsLoading(true);

    const formData = makeRecipeRequestData(data, decodedToken.id);

    try {
      const isCreated = await updateRecipe(recipeId, formData);
      if (isCreated) {
        message.success("Рецепт изменен успешно");
        dispatch(fetchOneRecipe(recipeId));
        handleCancel();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submiteForm = () => {
    form.submit();
  };

  const handleCancel = () => {
    changeModalState(false);
  };

  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={handleCancel}>
        Назад
      </Button>,
      <Button key="submit" type="primary" loading={isLoading} onClick={submiteForm}>
        Изменить
      </Button>,
    ],
    []
  );
  return (
    <Modal
      title="Редактирование рецепта"
      open={isModalOpen}
      width={850}
      onCancel={handleCancel}
      footer={footerButtons}
    >
      <RecipeForm
        form={form}
        onFormFinished={onFormFinished}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default EditRecipeModal;
