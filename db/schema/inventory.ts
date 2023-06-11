import {mysqlTable, int, text, varchar} from "drizzle-orm/mysql-core";
import {InferModel} from "drizzle-orm";

export const inventory = mysqlTable('inventory', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {length: 20}),
    price: varchar('price', {length: 20}),
    description: text('description')
})


export type Inventory = InferModel<typeof inventory>
export type InsertInventory = InferModel<typeof inventory, 'insert'>