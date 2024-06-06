import Dexie from "dexie";

export const db = new Dexie("my-books");

db.version(1).stores({
  books: "++id, category",
});
