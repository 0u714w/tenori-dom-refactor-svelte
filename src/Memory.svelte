<script>
  import { operationStore, query, mutation } from '@urql/svelte';
  import { getContext } from 'svelte';

  const context = getContext('value');

  const getSetting = operationStore(
    `
    query ($id: ID!) {
      getSetting(id: $id) {
        id
        name
        value
        createdAt
      }
    }
    `,
    { id: '' },
    { pause: true }
  );

  const newSettingMutation = mutation({
    query: `
      mutation($setting: SettingInput! ) {
        createNewSetting(setting: $setting) {
          setting {
            id
            name
            value
          }
        }
      }
    
    `,
  });

  query(getSetting);

  const unPause = async () => {
    $getSetting.variables.id = '7';
    $getSetting.context.pause = false;
  };

  const saveSetting = async () => {
    console.log($context);
    const value = JSON.stringify($context);
    const result = await newSettingMutation({
      setting: { name: 'First New Setting', value },
    });
    console.log('here is the mutation result', result);
  };

  $: {
    console.log($getSetting.data);
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
  div {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 30px);
    gap: 10px;
    justify-content: flex-end;
    padding-right: 6px;
  }
</style>

<div>
  <button on:click={unPause}><i class="fas fa-random" /></button>
  <button on:click={unPause}><i class="fas fa-file-download" /></button>
  <button on:click={saveSetting}><i class="fas fa-save" /></button>
</div>
