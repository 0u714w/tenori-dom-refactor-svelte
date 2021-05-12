<script>
  import { timerIntervals, tenoriState, nameState, tempo, currentStep, now } from './stores';

  const play = () => {
    return tenoriState.update((store) => {
      const updatedStore = { ...store };
      updatedStore.play = !updatedStore.play;
      if (updatedStore.play) {
        timerIntervals.update((timers) => {
          const interval = setInterval(() => {
            now.update(() => new Date().getTime());
            currentStep.update((step) => (step = step === 16 ? (step -= 15) : (step += 1)));
          }, $tempo);
          timers.push(interval);
          return timers;
        });
      } else {
        timerIntervals.update((timers) => {
          timers.map((x) => clearInterval(x));
          return [];
        });
      }
      return updatedStore;
    });
  };

  tempo.subscribe((tempo) => {
    const { play } = $tenoriState;
    if (play) {
      setTimeout(() => {
        timerIntervals.update((timers) => {
          const interval = setInterval(() => {
            now.update(() => new Date().getTime());
            currentStep.update((step) => (step = step === 16 ? (step -= 15) : (step += 1)));
          }, tempo);
          timers.push(interval);
          return timers.map((x, i, a) => (i !== a.length - 1 ? clearInterval(x) : x));
        });
      }, tempo - (new Date().getTime() - $now));
      now.update(() => new Date().getTime());
    }
  });

  const stop = () => {
    timerIntervals.update((timers) => {
      timers.map((x, i) => clearInterval(x));
      return [];
    });
    tenoriState.update((store) => {
      const updatedStore = { ...store };
      updatedStore.play = false;
      return updatedStore;
    });
    currentStep.update((step) => {
      step = 1;
      return step;
    });
  };
</script>

<section>
  <div>
    <h1>TENORI DOM</h1>
    <small class:showName={$nameState.length}>{$nameState}</small>
  </div>
  <div>
    <span>{$currentStep}</span>
    {#if $tenoriState.play}
      <button on:click={play}> <i class="fas fa-pause" /> </button>
    {:else}<button on:click={play}> <i class="fas fa-play" /> </button>{/if}
    <button on:click={stop}><i class="fas fa-stop" /></button>
  </div>
</section>

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
    visibility: hidden;
    color: rgb(120, 120, 120);
    min-height: 30px;
    background-color: aquamarine;
    border-radius: 3px;
    padding: 5px 6px;
    text-align: center;
  }

  span {
    display: inline-block;
  }

  .showName {
    visibility: unset;
  }
</style>
