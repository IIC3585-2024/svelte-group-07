<script>
    import { categories } from "../data/categories.js";
    import { db } from "../db.js";
    import { onMount } from "svelte";
    import BoardBookCard from "./BoardBookCard.svelte";

    let books = {};

    async function getBooks() {
        const booksArray = await db.books.toArray();
        books = booksArray.reduce((acc, book) => {
            if (!acc[book.category]) {
                acc[book.category] = [];
            }
            acc[book.category].push(book);
            return acc;
        }, {});
        books.all = booksArray;
    }

</script>


<div class="board">
    <div class="row scroll-container">
    {#await getBooks()}
    <p>Loading...</p>
    {:then}
    {#each categories as category, i}
        <div class="col" id={category.id}>
            <a class="col-title green" href="/gallery/{category.id}">
                {category.name}
            </a>
            
            {#if !books[category.id]}
                <p>No books in this category</p>
            {:else}
            {#each [...books[category.id]] as book, j}
                <button class="inv" on:click={() => window.location.href=`book/${book.id}`}>
                    <BoardBookCard book={book} />
                </button>
            {/each}
            {/if} 
        </div>
    {/each}
    {/await}
    </div>
</div>

<style>

.board {
    background-color: transparent;
}

.row {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    min-height: 70vh;
}

.col {
    display: flex;
    flex-direction: column;
    column-gap: 50px;
    border-radius: 8px;
    padding: 10px;
    margin: 0 1rem;
    width: 20rem;
    text-align: center;
    align-content: start;
    justify-items: center;
    background-color: #202020;
}

.scroll-container {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
}

.col-title:hover {
    cursor: pointer;
}

.inv {
    background-color: transparent;
    border: none;
}

</style>