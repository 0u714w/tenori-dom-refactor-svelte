<script>
  import { tenoriState } from './stores';

  const waveChange = (num) => {
    tenoriState.update((store) => {
      if (num > 0) {
        if (store.wave === 3) {
          store.wave = 0;
        } else {
          store.wave += 1;
        }
      } else {
        if (store.wave === 0) {
          store.wave = 3;
        } else {
          store.wave -= 1;
        }
      }
      return store;
    });
  };
</script>

<div>
  <button on:click={() => waveChange(1)}> <i class="fas fa-minus" /> </button>
  <i class="fas fa-wave-square" />
  <button on:click={() => waveChange(0)}> <i class="fas fa-plus" /> </button>
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
