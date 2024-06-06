import Dexie from "dexie";

export const db = new Dexie("my-books-sv");

db.version(1).stores({
  books: "++id, category",
});
