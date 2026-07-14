import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  /** Comma-separated DNS IPs for Node SRV lookups (helps querySrv ECONNREFUSED on some networks). */
  DNS_SERVERS: process.env.DNS_SERVERS?.trim() || "",
  /** When true, use IPv4 only for MongoDB connections (can help on some Windows networks). */
  MONGODB_FORCE_IPV4: process.env.MONGODB_FORCE_IPV4 === "true"
};

if (!env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required in .env");
}

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required in .env");
}
