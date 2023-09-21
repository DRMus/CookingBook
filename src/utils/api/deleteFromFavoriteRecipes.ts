import { message } from "antd";
import axios from "../../core/axios";

/** Удаление рецепта из избранных пользователя */
export async function deleteFromFavoriteRecipes(userId: number, recipeId: number, token: string) {
  try {
    await axios.post(`/users/dislike/${userId}`, { recipeId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (e: any) {
    message.error(e.message);
    return false
  }
}