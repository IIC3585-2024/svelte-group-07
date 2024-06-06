<script>
    let found = true;

    function searchBooks() {
        console.log("searching books");
    }

</script>

<main>
    <h2 id="search-title">Search for a book</h2>
    <div class="search">
        <input class="text-search" type="text" placeholder="The Lord of the Rings" />
        <select class="search-by">
            <option value="q">All</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
        </select>
        <button class="search-submit" on:click={searchBooks()}>Search</button>
    </div>
    <div class="results-container">
        <div class="gallery">
        </div>
    </div>
    {#if !found}
        <div class="warning-message">
            <h3>No books found</h3>
        </div>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        flex:1;
        min-width: 70vw;
        height: 90vh;
        width: 100%;
        margin-top: 100px;
    }

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