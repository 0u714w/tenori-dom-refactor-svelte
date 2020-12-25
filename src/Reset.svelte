<script>
  import { getContext } from 'svelte';
  import createInitialState from './InitialState';

  const context = getContext('value');
  const nameContext = getContext('name');
  const currentStep = getContext('currentStep');
  const tempo = getContext('tempo');
  const intervals = getContext('timerIntervals');

  const reset = () => {
    context.update(() => createInitialState());
    nameContext.update(() => '');
    currentStep.update(() => 1);
    tempo.update(() => 800);
    intervals.update((timers) => {
      timers.map((x) => clearInterval(x));
      return [];
    });
  };
</script>

<style>
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>

<button on:click={reset}><i class="fas fa-trash-alt" /></button>
