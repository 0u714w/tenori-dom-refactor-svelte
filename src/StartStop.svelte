<script>
  import { getContext } from 'svelte';
  import { get } from 'svelte/store';
  const context = getContext('value');
  const tempoContext = getContext('tempo');

  let timer;

  const play = () => {
    return context.update((store) => {
      const updatedStore = { ...store };
      updatedStore.play = !updatedStore.play;
      if (updatedStore.play) {
        timer = setInterval(() => {
          context.update((store) => {
            store.currentStep =
              store.currentStep === 16 ? (store.currentStep -= 15) : (store.currentStep += 1);
            return store;
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
        context.update((store) => {
          store.currentStep =
            store.currentStep === 16 ? (store.currentStep -= 15) : (store.currentStep += 1);
          return store;
        });
      }, tempo * 1000);
    }
  });

  const stop = () => {
    return context.update((store) => {
      clearInterval(timer);
      const updatedStore = { ...store };
      updatedStore.play = false;
      updatedStore.currentStep = 1;
      return updatedStore;
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
<h1>{$context.currentStep}</h1>
<div>
  {#if $context.play}
    <button on:click={play}> <i class="fas fa-pause" /> </button>
  {:else}<button on:click={play}> <i class="fas fa-play" /> </button>{/if}
  <button on:click={stop}><i class="fas fa-stop" /></button>
  <button on:click={() => console.log($context)}>console log context</button>
</div>
