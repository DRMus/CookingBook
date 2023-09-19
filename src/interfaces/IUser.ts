import { FetchingDataTemplate } from ".";

export interface IUser extends FetchingDataTemplate {
  username: string,
  password: string,
}