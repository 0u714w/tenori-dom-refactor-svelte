<script>
  import { getContext } from 'svelte';
  import ToneGenerator from './ToneGenerator';
  export let note;
  export let frequency;
  export let step;
  export let stepNumber;

  const context = getContext('value');
  const currentStepContext = getContext('currentStep');

  const updateStatus = () => {
    return context.update((store) => {
      const updateStore = { ...store };
      updateStore.notes
        .filter((x) => x.note === note)
        .map((y) => (y.steps[stepNumber - 1].status = !y.steps[stepNumber - 1].status));
      return updateStore;
    });
  };

  currentStepContext.subscribe((step) => {
    if ($context.play) {
      if (stepNumber === step) {
        const [noteToPlay] = $context.notes
          .filter((x) => x.note === note)
          .map((x) => x.steps[stepNumber - 1].status);
        if (noteToPlay) {
          const options = {
            note,
            frequency,
            ...$context,
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
    transition: 0.1s ease-in-out;
  }
  i {
    color: grey;
  }
  i.activeStep {
    color: pink;
    transform: scale(1.25, 1.25);
    transition: 0.1s ease-in-out;
  }
  i.selected {
    color: aquamarine;
  }
  i.playing {
    color: #43414e;
    transform: scale(1.4, 1.4);
    transition: 0.1s ease-in-out;
  }
</style>

<button on:click={updateStatus}>
  <i
    class:selected={step.status}
    class:activeStep={$currentStepContext === stepNumber && $context.play}
    class:playing={$currentStepContext === stepNumber && step.status && $context.play}
    class="fas fa-circle" />
</button>
