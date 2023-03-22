export enum EGenders {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  name: string;
  email: string;
  gender: string;
  password: string;
}
