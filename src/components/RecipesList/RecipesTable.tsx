import { Rate, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import "./RecipesTable.scss";
import { useNavigate } from "react-router";
import { FireFilled } from "@ant-design/icons";
import classNames from "classnames";

interface TableData {
  key: string;
  title: string;
  ingredients: string[];
  likes: number;
  difficulty: number;
}

const columns: ColumnsType<TableData> = [
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

const testData: TableData[] = [
  {
    key: "1",
    difficulty: 3,
    ingredients: [
      "Лук",
      "Соль",
      "Сахар",
      "Лук",
      "Соль",
      "Сахар",
      "Лук",
      "Соль",
      "Сахар",
      "Лук",
      "Соль",
      "Сахар",
      "Лук",
      "Соль",
      "Сахар",
    ],
    likes: 4,
    title: "Луковый угар",
  },
  {
    key: "2",
    difficulty: 3,
    ingredients: ["Лук", "Соль", "Сахар"],
    likes: 4,
    title: "Луковый угар",
  },
  {
    key: "3",
    difficulty: 3,
    ingredients: ["Лук", "Соль", "Сахар"],
    likes: 4,
    title: "Луковый угар",
  },
  {
    key: "4",
    difficulty: 3,
    ingredients: ["Лук", "Соль", "Сахар"],
    likes: 4,
    title: "Луковый угар",
  },
];

interface Props {
  isSiderBrokeen: boolean;
}

const RecipesTable = ({ isSiderBrokeen }: Props) => {
  const navigate = useNavigate();

  const onRowSelect = (rowData: TableData, rowIndex: number | undefined) => {
    return {
      onClick: () => {
        navigate(`recipe?id=${rowData.key}`);
      },
    };
  };

  return (
    <Table
      bordered
      columns={columns}
      dataSource={testData}
      pagination={{ pageSize: 11, position: ["bottomCenter"] }}
      className={classNames("recipes-table", {
        "add-padding-left": isSiderBrokeen,
      })}
      tableLayout="fixed"
      rowClassName="recipes-table-row"
      onRow={onRowSelect}
    />
  );
};

export default RecipesTable;
