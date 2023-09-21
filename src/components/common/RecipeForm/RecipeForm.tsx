import { FireFilled } from "@ant-design/icons";
import {
  UploadProps,
  UploadFile,
  Input,
  Rate,
  Upload,
  Form,
  Typography,
  FormInstance,
  message,
} from "antd";
import { UploadChangeParam, RcFile } from "antd/es/upload";
import { useState } from "react";
import ReactQuill from "react-quill";
import { ICreateRecipe, ICreateRecipeIngredients } from "../../../interfaces/IRecipe";
import { getBase64 } from "../../../utils/getBase64";
import IngredientsArea from "./IngredientsArea";
import UploadButton from "./UploadButton";

import "./RecipeForm.scss"

const { Text } = Typography;

interface Props {
  initialValues?: ICreateRecipe;
  form: FormInstance<ICreateRecipe>;
  onFormFinished: (data: ICreateRecipe) => void;
}

const defaultIngredients: ICreateRecipeIngredients[] = [
  { ingredient: "", alternate_ingredient: "" },
];

const RecipeForm = ({ form, initialValues, onFormFinished }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Для загрузки доступны только JPG/PNG');
    }
    return isJpgOrPng
  }

  /** Функция для отображения полученного изображения */
  const handleChangeImage: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
    });
  };
  return (
    <Form<ICreateRecipe>
      className="create-recipe-form"
      initialValues={initialValues}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 17 }}
      form={form}
      onFinish={onFormFinished}
    >
      <Form.Item
        name={"title"}
        label="Название"
        rules={[{ required: true, message: "Это обязательное поле" }]}
      >
        <Input placeholder="Название" />
      </Form.Item>

      <Form.Item label="Описание" name={"description"}>
        <Input.TextArea placeholder="Описание" />
      </Form.Item>

      <Form.Item
        label="Сложность"
        name={"difficulty"}
        rules={[{ required: true, message: "Это обязательное поле" }]}
      >
        <Rate allowClear={false} character={<FireFilled />} />
      </Form.Item>

      <div className="create-recipe-form-ingredients">
        <Text className="create-recipe-form-ingredients-label">Ингредиенты</Text>
        <Form.List name="ingredients" initialValue={initialValues ? undefined : defaultIngredients}>
          {(fileds, { remove, add }) => (
            <IngredientsArea fileds={fileds} remove={remove} add={add} />
          )}
        </Form.List>
      </div>

      <Form.Item
        name={"cooking_order"}
        label="Этапы приготовления"
        rules={[{ required: true, message: "Это обязательное поле" }]}
      >
        <ReactQuill theme="snow" />
      </Form.Item>

      <Form.Item name={"image"} label="Фото" valuePropName="file">
        <Upload
          listType="picture-card"
          showUploadList={false}
          action={"https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"}
          beforeUpload={beforeUpload}
          onChange={handleChangeImage}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="image" style={{ width: "100%" }} />
          ) : (
            <UploadButton />
          )}
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default RecipeForm;
