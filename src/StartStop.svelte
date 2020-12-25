<script>
  import { getContext } from 'svelte';
  const context = getContext('value');
  const name = getContext('name');
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
    max-height: 130px;
    grid-template-columns: repeat(2, auto);
  }

  div:nth-child(2) {
    display: grid;
    grid-template-columns: repeat(3, 30px);
    align-items: center;
    justify-content: end;
    height: 100%;
    gap: 10px;
    padding-right: 6px;
  }

  div:first-child {
    display: grid;
    margin-left: 10px;
    grid-template-rows: repeat(2, auto);
    justify-content: start;
  }

  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
  small {
    color: rgb(120, 120, 120);
    min-height: 20px;
  }
  span {
    display: inline-block;
  }
</style>

<section>
  <div>
    <h1>TENORI DOM</h1>
    <small>{$name}</small>
  </div>
  <div>
    <span>{$currentStepContext}</span>
    {#if $context.play}
      <button on:click={play}> <i class="fas fa-pause" /> </button>
    {:else}<button on:click={play}> <i class="fas fa-play" /> </button>{/if}
    <button on:click={stop}><i class="fas fa-stop" /></button>
  </div>
</section>
