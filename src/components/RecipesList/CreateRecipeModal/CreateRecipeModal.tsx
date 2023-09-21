import { Button, Form, Modal, message } from "antd";
import { useMemo } from "react";
import { ICreateRecipe } from "../../../interfaces/IRecipe";
import { makeRecipeRequestData } from "../../../utils/makeRecipeRequestData";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/useAppDispatch";
import { createRecipe } from "../../../utils/api/createRecipe";
import RecipeForm from "../../common/RecipeForm/RecipeForm";
import { fetchRecipes } from "../../../redux/actions/RecipesActions";

interface Props {
  isModalOpen: boolean;
  changeModalState: (state: boolean) => void;
}

const CreateRecipeModal = ({ isModalOpen, changeModalState }: Props) => {
  const [form] = Form.useForm<ICreateRecipe>();

  const dispatch = useAppDispatch();
  const { decodedToken } = useAppSelector((state) => state.authReducer);

  const onFormFinished = async (data: ICreateRecipe) => {
    if (!decodedToken) return;

    /** Создаем FormData из полученных данных с формы */
    const formData = makeRecipeRequestData(data, decodedToken.id);

    /** Если рецепт создан, то отображаем сообщение об успешном создании */
    const isCreated = await createRecipe(formData);

    if (isCreated) {
      message.success("Рецепт создан успешно");
      dispatch(fetchRecipes());
      handleCancel();
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
      <Button key="submit" type="primary" onClick={submiteForm}>
        Создать
      </Button>,
    ],
    []
  );

  return (
    <Modal
      title="Создание рецепта"
      open={isModalOpen}
      width={850}
      onCancel={handleCancel}
      footer={footerButtons}
    >
      <RecipeForm form={form} onFormFinished={onFormFinished} />
    </Modal>
  );
};

export default CreateRecipeModal;
