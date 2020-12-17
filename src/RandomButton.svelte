<script>
  import { operationStore, query } from '@urql/svelte';
  import { getContext } from 'svelte';

  const context = getContext('value');
  const randomSetting = operationStore(
    `
    query {
      getRandomSetting {
        id
        name
        value
        createdAt
      }
    }
    `,
    undefined,
    { pause: true }
  );

  $: {
    if ($randomSetting.data) {
      console.log('triggered', $randomSetting.data);
      console.log($context);
      const setting = JSON.parse($randomSetting.data.getRandomSetting.value);
      context.update((store) => {
        setting.play = false;
        if (store.play) {
          setting.play = true;
          return setting;
        }
        return setting;
      });
      console.log('here is the context', $context);
    }
  }

  query(randomSetting);

  const unPause = async () => {
    if ($randomSetting.context.pause) {
      $randomSetting.context.pause = false;
    } else {
      $randomSetting.context = { requestPolicy: 'cache-first' };
      $randomSetting.context = { requestPolicy: 'network-only' };
      $randomSetting.context.pause = true;
    }
  };
</script>

<style>
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>

<button on:click={unPause}><i class="fas fa-random" /></button>
