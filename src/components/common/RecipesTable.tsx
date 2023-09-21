import { Table } from "antd";
import { useNavigate } from "react-router";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { TableData } from "../../interfaces";
import { makeRecipesListForTable } from "../../utils/makeRecipesListForTable";
import { IRecipe } from "../../interfaces/IRecipe";

import "./RecipesTable.scss";
import { tableColums } from "./tableColums";

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
      columns={tableColums}
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
