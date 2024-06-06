<script>
    import { categories } from "../data/categories.js";
</script>


<div class="board">
    <div class="row scroll-container">
    {#each categories as category, i}
        <div class="col" id={category.id}>
            <a class="col-title green" href="/gallery/{category.id}">
                {category.name}
            </a>
        </div>
    {/each}
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

</style>