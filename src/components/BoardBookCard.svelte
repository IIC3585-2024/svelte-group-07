<script>
import { goto } from '$app.navigation';

//export let id;
export let title;
export let authors;
export let coverI;

$: authorsString = authors.join(', ').trimEnd();
$: coverURL = `http://covers.openlibrary.org/b/id/${coverI}-M.jpg`;

function deleteBook () {
    // To do
    // use id to delete
    goto('/');
}

function handleDeleteClick(event) {
    event.stopPropagation();
    deleteBook();
}
</script>
    
<div class="card">
    <img src={coverURL} alt="book" class="cover"/>
    <h2>{ title }</h2>
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