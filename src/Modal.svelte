<script>
  import { fade } from 'svelte/transition';
  export let open = false;
  export let loading = false;
</script>

<style>
  .overlay {
    position: absolute;
    display: grid;
    grid-template-columns: 1fr;
    align-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: rgba(20, 20, 20, 0.5);
  }

  .modal {
    justify-self: center;
    border-radius: 3px;
    background-color: white;
    width: 400px;
    min-height: 200px;
    overflow: hidden;
  }

  .content {
    padding: 15px;
    margin: 30px 0;
  }

  button {
    font-weight: bold;
    width: min-content;
    height: min-content;
    justify-self: end;
    padding: 10px;
    border: none;
    appearance: none;
    color: white;
    background-color: black;
    outline: none;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(120, 120, 120);
    transition: unset;
    transform: unset;
    transition: color 0.28s ease-in-out;
  }

  .button-div {
    display: grid;
    justify-self: end;
  }
</style>

{#if open}
  <div class="overlay" transition:fade={{ delay: 10, duration: 130, amount: 10 }}>
    <div class="modal" transition:fade={{ delay: 10, duration: 130, amount: 10 }}>
      <div class="button-div"><button type="button" on:click={() => (open = !open)}>X</button></div>
      <div class="content">
        {#if loading}
          <div>Loading...</div>
        {:else}
          <slot />
        {/if}
      </div>
    </div>
  </div>
{/if}
