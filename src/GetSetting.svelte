<script>
  import { query, operationStore } from '@urql/svelte';
  import { getContext } from 'svelte';
  import Modal from './Modal.svelte';
  export let isSaving = false;

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
    { pause: true, requestPolicy: 'cache-first' }
  );

  query(getSettingQuery).subscribe((query) => {
    if (query?.data?.getSetting && !isSaving) {
      errors = {};
      query?.data?.getSetting && updateContext(query.data.getSetting);
    } else {
      errors.setting = 'No results found.';
    }
  });

  function getSetting() {
    isSaving = false;
    $getSettingQuery.variables.id = id;
    $getSettingQuery.context.pause = false;
    id = '';
  }

  function toggle() {
    errors = {};
    open = !open;
    id = '';
  }

  function updateContext(query) {
    const { value, name } = query;
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

  function focus(element) {
    element.focus();
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
    font-size: 0.8em;
    justify-self: center;
    padding: 2px 10px;
    margin: 10px 0;
  }

  input {
    outline: none;
  }

  .errors {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
  }

  .get-setting-form {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    gap: 10px;
    text-align: center;
  }
</style>

<button on:click={toggle}><i class="fas fa-file-download" /></button>
<Modal bind:open loading={$getSettingQuery.fetching}>
  <form
    class="get-setting-form"
    on:submit|preventDefault={getSetting}
    on:keydown={(e) => e.key === 'Enter' && getSetting()}>
    <label for="id-num"> ID </label>
    <input type="text" id="id-num" placeholder="Setting ID" bind:value={id} use:focus />
    <button disabled={!id.length} type="submit"><i class="fas fa-paper-plane" /></button>
  </form>
  <div class="errors">
    {#each Object.entries(errors) as [, error]}<span>{error}</span>{/each}
  </div>
</Modal>
