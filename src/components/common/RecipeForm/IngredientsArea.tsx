import { Button, FormListFieldData } from "antd";
import IngredientRow from "./IngredientRow";

interface Props {
  fileds: FormListFieldData[];
  remove: (index: number | number[]) => void;
  add: (defaultValue?: any, insertIndex?: number | undefined) => void;
}

const IngredientsArea = ({ fileds, remove, add }: Props) => {
  return (
    <div className="create-recipe-form-ingredients-list">
      {fileds.map((filed, index) => (
        <IngredientRow
          key={index}
          filed={filed}
          index={index}
          filedsLength={fileds.length}
          remove={remove}
        />
      ))}
      <Button
        type="dashed"
        onClick={() => add({ ingredient: "", alternate_ingredient: "" })}
      >
        Добавить ингредиент
      </Button>
    </div>
  );
};

export default IngredientsArea;
