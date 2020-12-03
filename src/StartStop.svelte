<script>
  import { getContext } from 'svelte';
  const context = getContext('value');
  const tempoContext = getContext('tempo');
  const currentStepContext = getContext('currentStep');

  let timer;

  const play = () => {
    return context.update((store) => {
      const updatedStore = { ...store };
      updatedStore.play = !updatedStore.play;
      if (updatedStore.play) {
        timer = setInterval(() => {
          currentStepContext.update((step) => {
            step = step === 16 ? (step -= 15) : (step += 1);
            return step;
          });
        }, $tempoContext);
      } else {
        clearInterval(timer);
      }
      return updatedStore;
    });
  };

  tempoContext.subscribe((tempo) => {
    const { play } = $context;
    if (play) {
      clearInterval(timer);
      timer = setInterval(() => {
        currentStepContext.update((step) => {
          step = step === 16 ? (step -= 15) : (step += 1);
          return step;
        });
      }, tempo);
    }
  });

  const stop = () => {
    context.update((store) => {
      clearInterval(timer);
      const updatedStore = { ...store };
      updatedStore.play = false;
      return updatedStore;
    });
    currentStepContext.update((step) => {
      step = 1;
      return step;
    });
  };
</script>

<style>
  section {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    align-items: end;
    margin: 10px 0;
  }
  div:nth-child(2) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>

<section>
  <div>
    <h1>TENORI DOM</h1>
  </div>
  <div>
    {$currentStepContext}
    {#if $context.play}
      <button on:click={play}> <i class="fas fa-pause" /> </button>
    {:else}<button on:click={play}> <i class="fas fa-play" /> </button>{/if}
    <button on:click={stop}><i class="fas fa-stop" /></button>
  </div>
</section>
