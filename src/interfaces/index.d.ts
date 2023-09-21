export interface AntFormFieldsFailed<T> {
  values: T;
  errorFields: FormErrorField[];
  outOfDate: boolean;
}

export interface FormErrorField {
  name: (string | number)[];
  errors: string[];
}

export interface AuthFormValues {
  username: string,
  password: string
}

export interface FetchingDataTemplate {
  id: number,
  created_at: Date
}

export interface TableData {
  key: string;
  title: string;
  ingredients: string[];
  likes: number;
  difficulty: number;
}

export interface ITagAltIngredients {
  id: number;
  names: string[];
}

export interface ITagIngredient {
  id: number,
  name: string,
  altInredients?: ITagAltIngredients
}

export interface IFilters {
  ingredients?: string[],
  rate?: [number, number],
  search?: string
  sortBy?: 1 | 2 | 3 | 4 | 5
}

