import {mysqlTable, int, varchar, boolean, datetime} from "drizzle-orm/mysql-core";
import {InferModel, relations, sql} from "drizzle-orm";
import {tokens} from "~/db/schema/token";

export const users = mysqlTable('users', {
    user_id: varchar('user_id', {length: 32}).notNull().primaryKey(),
    name: varchar('name', {length: 20}).default("Anonymous"),
    password: varchar('password', {length: 256}),
    email: varchar('email', {length: 30}),
    isEphemeral: boolean('is_ephemeral').default(true),
    cratedAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    isAdmin: boolean('is_admin').default(false)
})

// export const usersRelations = relations(users, ({many}) => ({
//     tokens: many(tokens)
// }))

export type User = InferModel<typeof users>