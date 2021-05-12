<script>
  import { tenoriState } from './stores.js';

  const releaseChange = (num) => {
    return tenoriState.update((store) => {
      if (num > 0) {
        store.release += 0.1;
      } else if (store.release <= 0) {
        store.release = 0;
      } else {
        store.release -= 0.1;
      }
      return store;
    });
  };
</script>

<div>
  <button on:click={() => releaseChange(0)}> <i class="fas fa-minus" /> </button>
  <i class="fas fa-ruler" />
  <button on:click={() => releaseChange(1)}> <i class="fas fa-plus" /> </button>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>
