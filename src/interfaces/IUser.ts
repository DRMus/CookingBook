import { FetchingDataTemplate } from ".";

export interface IUser extends FetchingDataTemplate {
  username: string,
}

export interface IDecodedUser {
  id: number,
  username: string,
  likes: number
}