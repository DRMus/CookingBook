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
