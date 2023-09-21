/** Интерфейс ошибки валидации формы */
export interface AntFormFieldsFailed<T> {
  values: T;
  errorFields: FormErrorField[];
  outOfDate: boolean;
}

/** Интерфейс ошибочных полей */
export interface FormErrorField {
  name: (string | number)[];
  errors: string[];
}

/** Интерфейс формы аворизации */
export interface AuthFormValues {
  username: string,
  password: string
}

/** Шаблон для всех интерфейсов получения данных с сервера */
export interface FetchingDataTemplate {
  id: number,
  created_at: Date
}

/** Интерфейс преобразованных данных для отображения рецептов в таблице */
export interface TableData {
  key: string;
  title: string;
  ingredients: string[];
  likes: number;
  difficulty: number;
}

/** Интерфейс преобразованных данных для отображения 
 *  ингредиентов на странице рецпта в виде тегов
 */
export interface ITagAltIngredients {
  id: number;
  names: string[];
}

/** Интерфейс преобразованных данных для отображения 
 *  ингредиентов на странице рецпта в виде тегов
 */
export interface ITagIngredient {
  id: number,
  name: string,
  altInredients?: ITagAltIngredients
}
/** Интерфейс формы фильтров */
export interface IFilters {
  ingredients?: string[],
  rate?: [number, number],
  search?: string
  sortBy?: 1 | 2 | 3 | 4 | 5
}

