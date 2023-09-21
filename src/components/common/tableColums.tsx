import { FireFilled } from "@ant-design/icons";
import { Tag, Rate } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableData } from "../../interfaces";

export const tableColums:ColumnsType<TableData> = [
  {
    key: "title",
    title: "Название",
    dataIndex: "title",
  },
  {
    key: "ingredients",
    title: "Ингредиенты",
    dataIndex: "ingredients",
    render: (_, { ingredients }) => (
      <>
        {ingredients.map((item, idx) => (
          <Tag key={idx} style={{ margin: "3px" }}>
            {item}
          </Tag>
        ))}
      </>
    ),
  },
  {
    key: "likes",
    title: "Количество лайков",
    dataIndex: "likes",
  },
  {
    key: "difficulty",
    title: "Сложность",
    dataIndex: "difficulty",
    render: (value, _, idx) => (
      <Rate key={idx} disabled value={value} character={<FireFilled />} />
    ),
  },
]; 