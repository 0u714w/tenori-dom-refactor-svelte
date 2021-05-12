<script>
  import { nameState, tenoriState, currentStep, timerIntervals, tempo } from './stores';
  import createInitialState from './InitialState';

  const reset = () => {
    tenoriState.update(() => createInitialState());
    nameState.update(() => '');
    currentStep.update(() => 1);
    tempo.update(() => 800);
    timerIntervals.update((timers) => {
      timers.map((x) => clearInterval(x));
      return [];
    });
  };
</script>

<button on:click={reset}><i class="fas fa-trash-alt" /></button>

<style>
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>
