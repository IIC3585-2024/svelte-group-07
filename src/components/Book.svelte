<script>
    export let bookProp;
    import { categories } from "../data/categories";
    import { onMount } from "svelte";

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
    $: authorString = book.author_name.join(", ").trimEnd();

    function moveToCategory(book, categoryId) {
        //TODO: move book to category
    }

    function deleteBook(book) {
        //TODO: delete book
    }

    function addToCategory(book, categoryId) {
        //TODO: add book to category
    }

    onMount(async () => {
        
        isInBook = window.location.pathname.contains("book");
        
        if (!isInBook) {
            book = bookProp;
        } else {
            bookId = window.location.pathname.split("/").pop();
            // TODO: fetch book from db
        }
        mounted = true;
    });
</script>

<main>
    {#if mounted}
        <div class="container">
            <img src={cover} alt={book.title} />
            <div>
                <h1>{book.title}</h1>
                <p>by {authorString}</p>
                <p class="publish-year">Published in {book.first_publish_year}</p>
                <p>{book.number_of_pages_median}</p>
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
                    <button class="button {colorClasses[i%colorClasses.length]}" on:click={moveToCategory(book,category.id)}>{category.name}</button>
                {/each}
                <button class="button button-red" on:click={deleteBook(book)}>Delete</button>
            </div>
        {:else}
            <div class="button-row">
                {#each filteredCategories as category, i}
                    <button class="button {colorClasses[i%colorClasses.length]}" on:click={addToCategory(book,category.id)}>{category.name}</button>
                {/each}
            </div>
        {/if}            
    {/if}

</main>


<style>

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