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
  console.log($context.currentStep);
</script>

<style>
  button {
    border: none;
    appearance: none;
    background-color: red;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }
  button.activeStep {
    background-color: green;
  }
  button.selected {
    background-color: green;
  }
  button.playing {
    background-color: black;
  }
</style>

<button
  class:selected={step.status}
  class:activeStep={$context.currentStep === stepNumber}
  class:playing={$context.currentStep === stepNumber && step.status}
  on:click={updateStatus} />
