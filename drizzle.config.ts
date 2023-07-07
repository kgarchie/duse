import type {Config} from "drizzle-kit";
import path from "path";
import 'dotenv/config';

function checkBoolString(str: string | undefined): Boolean {
    if (str === undefined) return false;
    return str.trim().toLowerCase() === 'true';
}

export const config = {
    user: checkBoolString(process.env.DEV) ? process.env.DB_USER : process.env.DB_USER_PROD ?? 'root',
    password: checkBoolString(process.env.DEV) ? process.env.DB_PASS : process.env.DB_PASS_PROD ?? '',
    database: checkBoolString(process.env.DEV) ? process.env.DB_NAME : process.env.DB_NAME_PROD ?? `${path.basename(process.cwd())}`,
    poolMax: checkBoolString(process.env.DEV) ? process.env.DB_CONNECTION_LIMIT : process.env.DB_CONNECTION_LIMIT_PROD ?? 10,
    host: checkBoolString(process.env.DEV) ? process.env.DB_HOST : process.env.DB_HOST_PROD ?? 'localhost'
}

export default {
    schema: "./db/schema/*",
    out: "./db/migrations",
    driver: "mysql2",
    dbCredentials: {
        connectionString: `mysql://${config.user}:${config.password}@${config.host}/${config.database}`,
    }
} as Config;