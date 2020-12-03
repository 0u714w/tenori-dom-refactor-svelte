<script>
  import { getContext } from 'svelte';

  const context = getContext('tempo');

  const tempoChange = (num) => {
    return context.update((tempo) => {
      if (num > 0) {
        tempo += 20;
      } else if (tempo <= 0) {
        tempo = 0;
      } else {
        tempo -= 20;
      }
      return tempo;
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
  <button on:click={() => tempoChange(1)}> <i class="fas fa-minus" /> </button>
  <i class="far fa-clock" />
  <button on:click={() => tempoChange(0)}> <i class="fas fa-plus" /> </button>
</div>
