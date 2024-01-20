export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormResponse = LoginForm & {
  token: string;
};

export type RegisterForm = {
  email: string;
  password: string;
  fullname: string;
  age: number;
};
