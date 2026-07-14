import { User } from "../../models/user.model";

export const AdminUserService = {
  getAllUsers: async () => User.find().sort({ createdAt: -1 }),

  updateRole: async (userId: string, role: "admin" | "user") => {
    return User.findByIdAndUpdate(userId, { role }, { new: true });
  }
};
