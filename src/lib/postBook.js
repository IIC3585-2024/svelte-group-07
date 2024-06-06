export function moveBook(book, category) {
  try {
    // TODO: update store
    const booksStore = {};

    const bookJson = JSON.parse(JSON.stringify(book));
    bookJson.category = category;

    booksStore.updateBook(bookJson);
  } catch (error) {
    console.error(error);
  }
}

export function addBook(book, category) {
  try {
    const booksStore = useBooksStore();

    const bookJson = JSON.parse(JSON.stringify(book));
    bookJson.category = category;

    booksStore.addBook(bookJson);
  } catch (error) {
    console.error(error);
  }
}

export function deleteBook(id) {
  try {
    const booksStore = useBooksStore();
    booksStore.deleteBook(id);
  } catch (error) {
    console.error(error);
  }
}
