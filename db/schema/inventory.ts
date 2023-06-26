import {mysqlTable, int, text, varchar, boolean, datetime, double} from "drizzle-orm/mysql-core";
import {InferModel, sql} from "drizzle-orm";
import {users} from "./user";

export const inventory = mysqlTable('inventory', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {length: 20}),
    price: double('price'),
    description: text('description'),
    isFeatured: boolean('is_featured').default(false),
    createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    editedBy: varchar('edited_by', {length: 128}).references(() => users.user_id)
})

export type Inventory = InferModel<typeof inventory>