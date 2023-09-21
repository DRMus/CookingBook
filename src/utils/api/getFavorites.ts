import { message } from "antd";
import axios from "../../core/axios";
import { IRecipe } from "../../interfaces/IRecipe";

/** Получение избранных рецптов пользователя */
export async function getFavorites(userId: number, token: string) {
  try {
    const favorites = await axios.get<IRecipe[]>(`/users/favorites/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return favorites.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      return;
    }
    
    message.error(e.message);
  }
}
