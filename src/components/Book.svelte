<script>
    import { categories } from "../data/categories";
    import getBookDescription from "../lib/getBookDescription.js";
    import { onMount } from "svelte";
    import { db } from "../db.js";

    export let closeFunction;
    export let bookProp;

    let book = {
        title: "",
        author_name: "",
        cover_i: 0,
        key: "",
        first_publish_year: 0,
        number_of_pages_median: 0,
        ratings_average: 0,
        ratings_count: 0,
    };

    let mounted = false;
    let bookId = 0;
    let isInBook = false;
    let description = "";
    let filteredCategories = categories.filter((category) => category.id !== "all");
    let colorClasses = ["button-green", "button-blue", "button-yellow", "button-light-blue"];

    $: cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    $: authorString = book.author_name;
    $: getBookDescription(book.key).then(desc => description = desc);

    async function moveToCategory(book, categoryId) {
        const bookObject = {...book, category: categoryId};
        await db.books.put(bookObject);
    }

    function deleteBook(book) {
        return async () => {
            await db.books.delete(book.id);
            window.location.href = "/";
        }
    }

    async function addToCategory(book, categoryId) {
        const bookObject = {...book, category: categoryId};
        const id = await db.books.add(bookObject);
    }

    function redirectWrapper(func) {
        return (book, category) => {
            try {
                func(book, category).then(() => {
                    if (closeFunction) {
                        closeFunction();
                    }
                    window.location.href = "/";
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    onMount(async () => {
        
        isInBook = window.location.pathname.includes("/book");
        if (!isInBook) {
            book = bookProp;
        } else {
            bookId = window.location.pathname.split("/").pop();
            db.books.get(parseInt(bookId)).then((bookFromDb) => {
                book = bookFromDb;
            });
        }
        mounted = true;
    });
</script>

<div class="book-view">
    {#if mounted}
        <div class="container">
            <img class="cover" src={cover} alt={book.title} />
            <div>
                <h1>{book.title}</h1>
                <h2>by {authorString}</h2>
                <p class="publish-year">Published in {book.first_publish_year}</p>
                <p>{book.number_of_pages_median} Pages</p>
                <ul class="ratings">
                    <li class="rating-avg">
                        {#each Array(Math.round(book.ratings_average)) as _, i}
                            <span class="star">★</span>
                        {/each}
                        <span class="average">{book.ratings_average.toFixed(2)}</span>
                    </li>
                    <li>-</li>
                    <li>{book.ratings_count} Ratings</li>
                </ul>
                <p class="description">{description}</p>
            </div>
        </div>
        {#if isInBook}
            <div class="button-row">
                {#each filteredCategories as category, i}
                    <button class="button {colorClasses[i%colorClasses.length]}" on:click={redirectWrapper(moveToCategory)(book,category.id)}>{category.name}</button>
                {/each}
                <button class="button button-red" on:click={deleteBook(book)}>Delete</button>
            </div>
        {:else}
            <div class="button-row">
                {#each filteredCategories as category, i}
                    <button class="button {colorClasses[i%colorClasses.length]}" on:click={redirectWrapper(addToCategory)(book,category.id)}>{category.name}</button>
                {/each}
            </div>
        {/if}
    {/if}

</div>


<style>

    .book-view {
        margin: 0 8rem
    }

    .container {
        display: flex;
        flex-direction: row;
    }

    h1 {
        font-weight: bold;
    }

    .cover {
        width: 16rem;
        height: auto;
        max-height: 25rem;
        margin-right: 3rem;
        margin-top: 0.9rem;
    }

    .publish-year {
        margin-top: 0.5rem;
    }

    .ratings {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: end;
        gap: 0.3rem;
    }

    .rating-avg {
        display: flex;
        flex-direction: row;
        align-items: end;
    }

    .star {
        font-size: 1.2em;
    }

    .average {
        margin-left: 0.3rem;
    }

    .description {
        margin-top: 2rem;
        font-size: 1.1em;
        line-height: 1.5em;
    }

    .button {
        margin-right: 5px;
    }

</style>