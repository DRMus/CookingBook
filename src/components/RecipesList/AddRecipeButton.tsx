import { Button, Space } from "antd"

import "./AddRecipeButton.scss"

const AddRecipeButton = () => {
  return (
    <Space className="add-recipe-container">
      <Button type="primary">Создать рецепт</Button>
    </Space>
  )
}

export default AddRecipeButton