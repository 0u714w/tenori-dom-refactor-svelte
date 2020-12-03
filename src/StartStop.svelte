<script>
  import { getContext } from 'svelte';
  import { get } from 'svelte/store';
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
        }, 1000 * get(tempoContext));
      } else {
        clearInterval(timer);
      }
      return updatedStore;
    });
  };

  tempoContext.subscribe((tempo) => {
    const { play } = get(context);
    if (play) {
      clearInterval(timer);
      timer = setInterval(() => {
        currentStepContext.update((step) => {
          step = step === 16 ? (step -= 15) : (step += 1);
          return step;
        });
      }, tempo * 1000);
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
  div {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
  }
</style>

<h1>{$tempoContext}</h1>
<h1>{$context.play}</h1>
<h1>{$currentStepContext}</h1>
<div>
  {#if $context.play}
    <button on:click={play}> <i class="fas fa-pause" /> </button>
  {:else}<button on:click={play}> <i class="fas fa-play" /> </button>{/if}
  <button on:click={stop}><i class="fas fa-stop" /></button>
  <button on:click={() => console.log($context)}>console log context</button>
</div>
