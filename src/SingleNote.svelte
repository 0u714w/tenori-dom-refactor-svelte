<script>
  import { getContext } from 'svelte';
  export let note;
  export let frequency;
  export let step;
  export let stepNumber;

  const context = getContext('value');

  const updateStatus = () => {
    return context.update((store) => {
      const updateStore = { ...store };
      updateStore.notes
        .filter((x) => x.note === note)
        .map((y) => (y.steps[stepNumber].status = !y.steps[stepNumber].status));
      return updateStore;
    });
  };
</script>

<style>
  button {
    border: none;
    appearance: none;
    background-color: red;
  }
  button.active {
    background-color: green;
  }
</style>

<button class:active={step.status} on:click={updateStatus}>hi</button>
