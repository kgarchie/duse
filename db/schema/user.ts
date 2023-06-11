import {mysqlTable, int, varchar} from "drizzle-orm/mysql-core";
import {InferModel} from "drizzle-orm";

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {length: 20}),
    password: varchar('password', {length: 256}),
    email: varchar('email', {length: 256}),
})

export type User = InferModel<typeof users>
export type InsertUser = InferModel<typeof users, 'insert'>