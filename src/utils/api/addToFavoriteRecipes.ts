import { message } from "antd";
import axios from "../../core/axios";

/** Добавление рецепта в избранные пользователя */
export async function addToFavoriteRecipes(userId: number, recipeId: number, token: string) {
  try {
    await axios.post(`/users/like/${userId}`, { recipeId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (e: any) {
    message.error(e.message);
    return false
  }
}
