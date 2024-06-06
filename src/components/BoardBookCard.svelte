<script>
import { db } from "../db.js";

export let book;

$: authorsString = book.author_name.join(', ').trimEnd();
$: coverURL = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

function deleteBook () {
    db.books.delete(book.id);
    window.location.href = "/";
}

function handleDeleteClick(event) {
    event.stopPropagation();
    deleteBook();
}
</script>
    
<div class="card">
    <img src={coverURL} alt="book" class="cover"/>
    <h2>{ book.title }</h2>
    <p>{ authorsString }</p>
    <div>
        <button on:click={handleDeleteClick} class="button button-red"> Delete </button>
    </div>
</div>
    
<style>
    .card {
        background-color: #2f2f2f;
        border-radius: 5px;
        margin: 5%;
        padding: 10px;
        text-align: center;
        color: #fff;
        text-wrap: wrap;
        height: auto;
        line-height: 1.3;
    }

    .card img {
        border-radius: 4px;
    }

    .card:hover {
        cursor: pointer;
    }

    .cover {
        width: 100%;
        height: 16rem;
        object-fit: cover;
    }
</style>