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
          .map((x) => x.steps[stepNumber - 1].status);
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
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
  i {
    color: red;
  }
  i.activeStep {
    color: green;
  }
  i.selected {
    color: green;
  }
  i.playing {
    color: black;
  }
</style>

<button on:click={updateStatus}>
  <i
    class:selected={step.status}
    class:activeStep={$context.currentStep === stepNumber && $context.play}
    class:playing={$context.currentStep === stepNumber && step.status && $context.play}
    class="fas fa-circle" />
</button>
