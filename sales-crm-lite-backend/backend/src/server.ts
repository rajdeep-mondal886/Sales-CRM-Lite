import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { seedDefaultPipeline } from "./config/seed";
import { startReminderCron } from "./cron/reminder.cron";

const bootstrap = async () => {
  await connectDB();
  await seedDefaultPipeline();
  startReminderCron();

  app.listen(Number(env.PORT), () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
};

bootstrap();
