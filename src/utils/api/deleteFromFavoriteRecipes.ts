import { message } from "antd";
import axios from "../../core/axios";

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