<script>
    import { onMount } from "svelte";
    let activeTab = "";

    onMount(() => {
        activeTab = window.location.pathname;
    });

    function handleTabClick(event) {
        activeTab = event.target.getAttribute("href");
    }
</script>
<div class ="navbar">
    <div class="navtabs">
        <h1 class="brand">
            My books 📚
        </h1>
        <a href="/" class="navtab" class:active={activeTab === '/'} on:click={handleTabClick}>Board</a>
        <a href="/gallery/all" class="navtab" class:active={activeTab === '/gallery/all'} on:click={handleTabClick}>All books</a>
        <a href="/add-book" class="navtab" class:active={activeTab === '/add-book'} on:click={handleTabClick}>Add Book</a>
    </div>
</div>


<slot></slot>


<style>
    .brand {
        line-height: normal;
        margin-right: auto;
    }

    .navbar {
        z-index: 98;
        position: fixed;
        top: 0;
        left: 10%;
        width: 80%;
        height: 100px;
    }

    .navtabs {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        background: #202020;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        padding: 10px 20px;
        position: relative;
        overflow-x: auto;
        white-space: nowrap;
    }

    .navtab {
        margin: 0 20px;
        padding: 10px 20px;
        cursor: pointer;
        color: #fff;
        transition: color 0.3s;
    }

    .navtab:hover {
        color: hsla(160, 100%, 37%, 1);
    }

    .navtab.active {
        color: hsla(160, 100%, 37%, 1);
        font-weight: 600;
    }
</style>