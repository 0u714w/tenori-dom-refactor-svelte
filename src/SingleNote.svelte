<script>
  import { tenoriState, currentStep } from './stores.js';
  import ToneGenerator from './ToneGenerator';
  export let note;
  export let frequency;
  export let step;
  export let stepNumber;

  const updateStatus = () => {
    return tenoriState.update((store) => {
      const updateStore = { ...store };
      updateStore.notes
        .filter((x) => x.note === note)
        .map((y) => (y.steps[stepNumber - 1].status = !y.steps[stepNumber - 1].status));
      return updateStore;
    });
  };

  currentStep.subscribe((step) => {
    if ($tenoriState.play) {
      if (stepNumber === step) {
        const [noteToPlay] = $tenoriState.notes
          .filter((x) => x.note === note)
          .map((x) => x.steps[stepNumber - 1].status);
        if (noteToPlay) {
          const options = {
            note,
            frequency,
            ...$tenoriState,
          };
          ToneGenerator(options);
        }
      }
    }
  });
</script>

<button on:click={updateStatus}>
  <i
    class:selected={step.status}
    class:activeStep={$currentStep === stepNumber && $tenoriState.play}
    class:playing={$currentStep === stepNumber && step.status && $tenoriState.play}
    class="fas fa-circle"
  />
</button>

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
