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
    `
  );

  query(randomSetting);

  const getRandomSetting = async () => {
    randomSetting.context = { requestPolicy: 'cache-first' };
    randomSetting.context = { requestPolicy: 'network-only' };
    const {
      getRandomSetting: { value },
    } = await randomSetting.data;
    const setting = JSON.parse(value);
    context.update((store) => {
      setting.play = false;
      if (store.play) {
        setting.play = true;
        return setting;
      }
      return setting;
    });
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

<button on:click={getRandomSetting}><i class="fas fa-random" /></button>
