import { message } from "antd";
import axios from "../../core/axios";
import { IRecipe } from "../../interfaces/IRecipe";


export async function getUserRecipes(userId: number, token: string) {
  try {
    const recipes = await axios.get<IRecipe[]>(`/users/recipes/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return recipes.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      return;
    }

    message.error(e.message);
  }
}
