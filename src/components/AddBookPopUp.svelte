<script>
    import Book from './Book.svelte';
    import close from '../assets/close.svg'

    export let book;
    export let closeFunction;

</script>

<div class="popup">
    <div class="popup-inner">
        <div id="close-block">
            <button class="wrapper-btn" on:click={closeFunction}>
                <img class="close-btn" src={close} alt="Close"/>
            </button>
        </div>
        <h2>Do you want to add the following book to category?</h2>
        <Book bind:bookProp={book} bind:closeFunction/>
    </div>
</div>


<style>
#close-block {
    display: flex;
    justify-content: flex-end;
    position: sticky;
    top: 0;
    padding: 20px 0;
    background-color: #181818;
    
    width: 100%;
}

.close-btn {
    cursor: pointer;
    fill: white;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner {
    background: #181818;
    padding: 0 20px;
    border-radius: 8px;
    width: 80%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 80vh;
}

.wrapper-btn {
    background-color: transparent;
    border: none;
}

.popup-book {
    width: 80%;
    height: 16rem;
    object-fit: cover;
}
</style>