import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env";

const applyCustomDnsIfConfigured = () => {
  if (!env.DNS_SERVERS) return;
  const servers = env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean);
  if (servers.length === 0) return;
  dns.setServers(servers);
};

const connectOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 15_000,
  // Helps some Windows / dual-stack networks reach Atlas when IPv6 routes fail.
  ...(env.MONGODB_FORCE_IPV4 ? { family: 4 as const } : {})
};

export const connectDB = async () => {
  try {
    applyCustomDnsIfConfigured();
    await mongoose.connect(env.MONGODB_URI, connectOptions);
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      "MongoDB connection failed. Local: start MongoDB. Atlas: allow your IP in Network Access, use %40 for @ in passwords, and if you see querySrv ECONNREFUSED set DNS_SERVERS=8.8.8.8,1.1.1.1 in .env or fix Windows DNS / VPN."
    );
    if (err instanceof mongoose.mongo.MongoServerSelectionError) {
      // eslint-disable-next-line no-console
      console.error(
        "Atlas checklist: (1) MongoDB Atlas → Network Access → Add Current IP Address, or temporarily 0.0.0.0/0 for dev. (2) Confirm cluster is running and DB user/password match Database Access. (3) If still failing, set MONGODB_FORCE_IPV4=true in .env."
      );
    }
    throw err;
  }
};
