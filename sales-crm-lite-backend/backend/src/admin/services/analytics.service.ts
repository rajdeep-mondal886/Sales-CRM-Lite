import { Lead } from "../../models/lead.model";
import { Task } from "../../models/task.model";
import { User } from "../../models/user.model";

export const AnalyticsService = {
  getOverview: async () => {
    const [users, leads, tasks, pipeline] = await Promise.all([
      User.countDocuments(),
      Lead.countDocuments(),
      Task.countDocuments(),
      Lead.aggregate([
        { $group: { _id: "$stage", count: { $sum: 1 } } },
        { $project: { _id: 0, stage: "$_id", count: 1 } }
      ])
    ]);

    return { users, leads, tasks, stageBreakdown: pipeline };
  }
};
