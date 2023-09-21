import axios from "../../core/axios";
import { userSlice } from "../reducers/UserSlice";
import { AppDispatch } from "../store";

export const fetchUserLikes =
  (id: number, token: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.userLikesPending());
      const response = await axios.get<{ likes: string }>(`/users/like/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const likes = response.data.likes.split(",");
      dispatch(userSlice.actions.userLikesFetchSuccess(likes));
    } catch (e: any) {
      dispatch(userSlice.actions.userLikesFetchFailed(e.message));
    }
  };
