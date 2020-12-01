<script>
  import { getContext } from 'svelte';
  const context = getContext('value');
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
        }, 100);
      } else {
        clearInterval(timer);
      }
      return updatedStore;
    });
  };

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

<h1>{$context.play}</h1>
<h1>{$context.currentStep}</h1>
{#if $context.play}
  <button on:click={play}> <i class="fas fa-pause" /> </button>
{:else}<button on:click={play}> <i class="fas fa-play" /> </button>{/if}
<button on:click={stop}><i class="fas fa-stop" /></button>
<button on:click={() => console.log($context)}>console log context</button>
