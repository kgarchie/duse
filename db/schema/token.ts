import {mysqlTable, int, varchar, boolean, datetime} from "drizzle-orm/mysql-core";
import {InferModel} from "drizzle-orm";
import {sql} from "drizzle-orm";
import {users} from "~/db/schema/user";

export const tokens = mysqlTable('tokens', {
    id: int('id').primaryKey().autoincrement(),
    token: varchar('token', {length: 36}).notNull(),
    isValid: boolean('is_valid').default(true),
    createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
    user_id: varchar('user_id', {length: 128}).notNull().references(() => users.user_id)
})

export type Token = InferModel<typeof tokens>