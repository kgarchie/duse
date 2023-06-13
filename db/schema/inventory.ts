import {mysqlTable, int, text, varchar, boolean, datetime, double} from "drizzle-orm/mysql-core";
import {InferModel} from "drizzle-orm";
import {users} from "./user";

export const inventory = mysqlTable('inventory', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {length: 20}),
    price: double('price'),
    description: text('description'),
    isFeatured: boolean('is_featured').default(false),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at").notNull().default(new Date()),
    editedBy: int('edited_by').references(() => users.id)
})

export type Inventory = InferModel<typeof inventory>