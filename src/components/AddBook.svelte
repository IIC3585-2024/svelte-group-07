<script>
    import getBooksByParam from "../lib/getBooksByParam.js";
    import AddBookPopUp from "./AddBookPopUp.svelte";

    let found = true;
    let field = 'q';
    let text = '';
    let books = []
    let showAddBookPopUp = false;
    let selectedBook = null;

    function searchBooks() {
        let searchQuery = '';
        let searchParam = 'q';

        if (field === 'title') {
            searchParam = 'title'
        } else if (field === 'author') {
            searchParam = 'author'
        }

        if (text) {
            searchQuery = text;
        }

        try {
            const getBooks = async () => {
                books = await getBooksByParam(searchQuery, searchParam);
                if (books.length === 0) {
                    found = false;
                } else {
                    found = true;
                }
            }
            getBooks();
        } catch (error) {
            console.error(error);
        }
    }

    function addBook(book) {
        selectedBook = {
            key: book.key,
            title: book.title,
            author_name: book.author_name,
            first_publish_year: book.first_publish_year,
            cover_i: book.cover_i,
            ratings_average: book.ratings_average,
            ratings_count: book.ratings_count,
            number_of_pages_median: book.number_of_pages_median,
        }
        showAddBookPopUp = true;
    }

</script>

<div>
    <h2 id="search-title">Search for a book</h2>
    <div class="search">
        <input class="text-search" type="text" placeholder="The Lord of the Rings" bind:value={text}/>
        <select class="search-by" bind:value={field}>
            <option value="q">All</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
        </select>
        <button class="search-submit" on:click={searchBooks}>Search</button>
    </div>
    <div class="results-container">
        <div class="gallery">
            {#each books as book}
                <button on:click={addBook(book)}>{book.title}</button>
            {/each}
        </div>
    </div>
    {#if !found}
        <div class="warning-message">
            <h3>No books found</h3>
        </div>
    {/if}
</div>
{#if showAddBookPopUp}
    <AddBookPopUp closeFunction={() => showAddBookPopUp = false} book={selectedBook}/>
{/if}

<style>
    #search-title {
        margin-top: 0.5rem;
    }

    .search {
        height: 3rem;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .text-search {
        font-size: 1.2em;
        background-color: #2f2f2f;
        appearance: none;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        color: rgba(235, 235, 235, .6);
    }

    .text-search:focus {
        outline: solid;
        outline-color: hsla(160, 100%, 37%, 1);
    }

    .search-by {
        font-size: 1.2em;
        background-color: #2f2f2f;
        appearance: none;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        color: rgba(235, 235, 235, .6);
    }

    .search-by:focus {
        outline: solid;
        outline-color: hsla(160, 100%, 37%, 1);
    }

    .search-submit {
        font-size: 1.2em;
        font-weight: semibold;
        background-color: hsla(160, 100%, 37%, 1);
        appearance: none;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        color: rgba(255, 255, 255, .9);
    }

    .search-submit:hover {
        background-color: hsla(160, 100%, 40%, 1);
        cursor: pointer;
    }

</style>