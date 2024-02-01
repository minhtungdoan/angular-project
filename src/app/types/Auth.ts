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
};

export type User = {
  _id: string;
  email: string;
  fullName: string;
  // age: number;
  avatar: string;
  password: string;
  registeredAt: string;
};
