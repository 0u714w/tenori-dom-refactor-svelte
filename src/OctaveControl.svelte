<script>
  import { getContext } from 'svelte';

  const context = getContext('value');
  const waveChange = (num) => {
    context.update((store) => {
      if (num > 0) {
        store.octave += 1;
      } else {
        store.octave -= 1;
      }
      return store;
    });
  };
</script>

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

<div>
  <button on:click={() => waveChange(1)}> <i class="fas fa-minus" /> </button>
  <i class="fas fa-music" />
  <button on:click={() => waveChange(0)}> <i class="fas fa-plus" /> </button>
</div>
