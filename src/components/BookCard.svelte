<script>

export let title;
export let authors;
export let coverI;

$: authorsString = authors.join(', ').trimEnd();
$: coverURL = `http://covers.openlibrary.org/b/id/${coverI}-M.jpg`;

</script>

<div class="card">
    <img src={coverURL} alt="book" class="cover"/>
    <h2>{ title }</h2>
    <p>{ authorsString }</p>
</div>

<style>
.card {
    background-color: #2f2f2f;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    margin: 10px;
    width: 18rem;
    text-align: center;
    text-wrap: wrap;
    height: auto;
}

.card:hover {
    cursor: pointer;
}

.cover {
    /* max height of 260px */
    width: 100%;
    height: 16rem;
    object-fit: cover;
}

</style>