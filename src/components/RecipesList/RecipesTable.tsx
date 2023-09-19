import { Rate, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import "./RecipesTable.scss";
import { useNavigate } from "react-router";
import { FireFilled } from "@ant-design/icons";
import classNames from "classnames";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../../redux/reducers/ActionCreators";
import { TableData } from "../../interfaces";
import { makeRecipesListForTable } from "../../utils/makeRecipesListForTable";


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
  isSiderBrokeen: boolean;
}

const RecipesTable = ({ isSiderBrokeen }: Props) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { recipesList, isLoading, error } = useAppSelector((state) => state.recipesReducer);

  const [formatedRecipesList, setFormatedRecipesList] = useState<TableData[]>([]);

  const onRowSelect = (rowData: TableData) => {
    return {
      onClick: () => {
        navigate(`recipe?id=${rowData.key}`);
      },
    };
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  useEffect(() => {
    setFormatedRecipesList(makeRecipesListForTable(recipesList));
  }, [recipesList])
  return (
    <Table
      bordered
      columns={columns}
      loading={isLoading}
      dataSource={formatedRecipesList}
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
