import { Rate, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router";
import { FireFilled } from "@ant-design/icons";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { TableData } from "../../interfaces";
import { makeRecipesListForTable } from "../../utils/makeRecipesListForTable";
import { IRecipe } from "../../interfaces/IRecipe";

import "./RecipesTable.scss";

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

interface Props {
  title?: () => ReactNode;
  isSiderBrokeen: boolean;
  recipesList: IRecipe[];
  isLoading: boolean;
}

const RecipesTable = ({ title, isSiderBrokeen, recipesList, isLoading }: Props) => {
  const navigate = useNavigate();

  const [formatedRecipesList, setFormatedRecipesList] = useState<TableData[]>([]);

  const onRowSelect = (rowData: TableData) => {
    return {
      onClick: () => {
        navigate(`/recipe?id=${rowData.key}`);
      },
    };
  };

  useEffect(() => {
    setFormatedRecipesList(makeRecipesListForTable(recipesList));
  }, [recipesList]);
  return (
    <Table
      bordered
      title={title}
      columns={columns}
      loading={isLoading}
      dataSource={formatedRecipesList}
      pagination={{ pageSize: 9, position: ["bottomCenter"] }}
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
