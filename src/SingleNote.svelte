<script>
  import { getContext } from 'svelte';
  import ToneGenerator from './ToneGenerator';
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
        .map((y) => (y.steps[stepNumber - 1].status = !y.steps[stepNumber - 1].status));
      return updateStore;
    });
  };
  context.subscribe((store) => {
    if (store.play) {
      if (stepNumber === store.currentStep) {
        const [noteToPlay] = store.notes
          .filter((x) => x.note === note)
          .map((y) => y.steps[stepNumber - 1].status);

        if (noteToPlay) {
          const options = {
            note,
            frequency,
            ...store,
          };
          ToneGenerator(options);
        }
      }
    }
  });
</script>

<style>
  button {
    border: none;
    appearance: none;
    background-color: red;
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
  class:activeStep={$context.currentStep === stepNumber && $context.play}
  class:playing={$context.currentStep === stepNumber && step.status}
  on:click={updateStatus} />
