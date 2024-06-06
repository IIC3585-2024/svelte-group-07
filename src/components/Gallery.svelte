<script>
    // get the category id from the URL
    import { categories } from "../data/categories.js";
    import { onMount } from "svelte";
    import BookCard from "./BookCard.svelte";
    import { db } from "../db.js";

    let category = {};
    let books = {};

    async function getBooksByCategory(categoryId) {
        if (!categoryId) return;
        else if (categoryId === "all") {
            const booksArray = await db.books.toArray();
            books = booksArray;
            return;
        }else{
            const booksArray = await db.books.where("category").equals(categoryId).toArray();
            books = booksArray;
        }
    }

    onMount(() => {
        const id = window.location.pathname.split("/").pop();
        category = categories.find((category) => category.id === id);
    });
</script>

<div class="container">
    <h1> {category.name} </h1>
    <div class="gallery">
        {#await getBooksByCategory(category.id)}
            <p>Loading...</p>            
        {:then} 
            {#each books as book, i}
                <a href="/book/{book.id}">
                    <BookCard book={book} />
                </a>
            {/each}
        {/await}
    </div>
</div>

<style>

.container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 70vw;
    height: 90vh;
    width: 100%;
}

.gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin: 20px;
}
</style>