import type { Config } from "drizzle-kit";
import path from "path";

export const config = {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || `${path.basename(process.cwd())}`,
    poolMax: process.env.DB_CONNECTION_LIMIT || 10,
    host: process.env.DB_HOST || 'localhost'
}

export default {
    schema: "./db/schema/*",
    connectionString: `mysql://${config.user}:${config.password}@${config.host}/${config.database}`,
    out: "./db/migrations"
} as Config;