import { IUser } from "../models/user.model";

export function toPublicUser(user: IUser) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
