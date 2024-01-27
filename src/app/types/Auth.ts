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

export type User = {
  _id: string;
  email: string;
  fullname: string;
  age: number;
  createdAt: string;
  updatedAt: string;
};
