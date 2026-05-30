import dotenv from "dotenv";
const ENV = process.env["NODE_ENV"];

dotenv.config({ path: ENV ? `.env.${ENV}` : ".env" });

function requireEnv(key: string): string {
    const value = process.env[key];
    if (!value)
        throw new Error(`Missing required environment variable: ${key}`);

    return value;
}

export const PORT = requireEnv("PORT");
export const GOOGLE_CLIENT_ID = requireEnv("GOOLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = requireEnv("GOOGLE_CLIENT_SECRET");
export const MONGO_DB_URI = requireEnv("MONGO_DB_URI");
export const SESSION_SECRET = requireEnv("SESSION_SECRET");
