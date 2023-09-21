import { FetchingDataTemplate } from ".";

/** Интерфейс полученного с сервера пользователя */
export interface IUser extends FetchingDataTemplate {
  username: string,
}

/** Интерфейс расшифрованного токена пользователя */
export interface IDecodedUser {
  id: number,
  username: string,
  likes: string
}