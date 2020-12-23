<script>
  import { query, operationStore } from '@urql/svelte';
  import { getContext } from 'svelte';
  import Modal from './Modal.svelte';

  const context = getContext('value');
  const nameContext = getContext('name');
  let open = false;
  let id = '';
  let errors = {};

  const getSettingQuery = operationStore(
    `
    query($id: ID!) {
      getSetting(id: $id) {
        id
        name
        createdAt
        value
      }
    }
    `,
    { id: id },
    { pause: true, requestPolicy: 'cache-and-network' }
  );

  query(getSettingQuery);

  const getSetting = async (id) => {
    $getSettingQuery.variables.id = id;
    $getSettingQuery.context.pause = false;
  };

  const toggle = () => {
    errors = {};
    open = !open;
  };

  $: {
    if ($getSettingQuery?.data?.getSetting === null) {
      errors.setting = 'No results found.';
    } else {
      errors = {};
    }

    if ($getSettingQuery?.data?.getSetting && Object.entries(errors).length === 0) {
      const { value, name } = getSettingQuery.data.getSetting;
      const setting = JSON.parse(value);
      nameContext.update(() => name);
      context.update((store) => {
        setting.play = false;
        if (store.play) {
          setting.play = true;
          return setting;
        }
        return setting;
      });
    }
  }
</script>

<style>
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }

  span {
    display: inline-block;
    background-color: red;
    border-radius: 3px;
    color: black;
    font-size: 0.8em;
    justify-self: center;
    padding: 2px 10px;
    margin: 10px 0;
  }

  .get-setting-form {
    display: grid;
    text-align: center;
  }
</style>

<button on:click={toggle}><i class="fas fa-file-download" /></button>
<Modal bind:open loading={$getSettingQuery.fetching}>
  <div class="get-setting-form">
    <label for="id-num"> ID </label>
    <input type="text" id="id-num" placeholder="Setting ID" bind:value={id} />
    <button on:click={() => getSetting(id)}><i class="fas fa-paper-plane" /></button>
    {#each Object.entries(errors) as [, error]}<span>{error}</span>{/each}
  </div>
</Modal>
