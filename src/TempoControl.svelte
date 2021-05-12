<script>
  import { tempo as tempoState } from './stores';

  const tempoChange = (num) => {
    return tempoState.update((tempo) => {
      if (num > 0) {
        tempo += 50;
      } else if (tempo <= 0) {
        tempo = 0;
      } else {
        tempo -= 50;
      }
      return tempo;
    });
  };
</script>

<div>
  <button on:click={() => tempoChange(1)}> <i class="fas fa-minus" /> </button>
  <i class="far fa-clock" />
  <button on:click={() => tempoChange(0)}> <i class="fas fa-plus" /> </button>
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
