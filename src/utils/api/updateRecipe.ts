import { message } from "antd";
import axios from "../../core/axios";

export async function updateRecipe(id: number, dto: FormData) {
  try {
    return await axios.post<boolean>(`/recipes/update/${id}`, dto, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (e: any) {
    message.error(e.response.message);
  }
}
