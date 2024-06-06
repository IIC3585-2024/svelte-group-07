<script>
    // get the category id from the URL
    import { categories } from "../data/categories.js";
    import { onMount } from "svelte";

    let category = {};

    onMount(() => {
        const id = window.location.pathname.split("/").pop();
        category = categories.find((category) => category.id === id);
    });

    console.log(category);
</script>

<main>
    <h1> {category.name} </h1>
    <div class="gallery">
    </div>
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

    .gallery {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        margin: 20px;
    }
</style>