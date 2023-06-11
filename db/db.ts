import {drizzle, MySql2Database} from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {config} from "~/drizzle.config";

const poolConnection: mysql.Pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: Number(config.poolMax)
});

const db: MySql2Database = drizzle(poolConnection);
export default db;