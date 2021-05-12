<script>
  import { operationStore, query } from '@urql/svelte';
  import { nameState, tenoriState } from './stores';

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
    if (randomSetting.data) {
      const {
        getRandomSetting: { value, name },
      } = await randomSetting.data;
      const setting = JSON.parse(value);
      nameState.update(() => name);
      tenoriState.update((store) => {
        setting.play = false;
        if (store.play) {
          setting.play = true;
          return setting;
        }
        return setting;
      });
    }
  };
</script>

<button on:click={getRandomSetting}><i class="fas fa-random" /></button>

<style>
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>
