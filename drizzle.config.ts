import type { Config } from "drizzle-kit";
import path from "path";

export const config = {
    user: process.env.DEV ? process.env.DB_USER : process.env.DB_USER_PROD ?? 'root',
    password: process.env.DEV ? process.env.DB_PASS : process.env.DB_PASS_PROD ?? '',
    database: process.env.DEV ? process.env.DB_NAME : process.env.DB_NAME_PROD ?? `${path.basename(process.cwd())}`,
    poolMax: process.env.DEV ? process.env.DB_CONNECTION_LIMIT : process.env.DB_CONNECTION_LIMIT_PROD  ?? 10,
    host: process.env.DEV ? process.env.DB_HOST : process.env.DB_HOST_PROD ?? 'localhost'
}

export default {
    schema: "./db/schema/*",
    connectionString: `mysql://${config.user}:${config.password}@${config.host}/${config.database}`,
    out: "./db/migrations"
} as Config;