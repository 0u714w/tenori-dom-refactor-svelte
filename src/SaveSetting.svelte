<script>
  import { mutation } from '@urql/svelte';
  import { getContext } from 'svelte';
  import Modal from './Modal.svelte';
  export let isSaving = false;

  const context = getContext('value');
  const nameContext = getContext('name');
  let open = false;
  let settingName = '';
  let errors = {};
  let loading = false;
  let successfulResult = false;

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

  const saveSetting = async (name) => {
    errors = {};
    if (name.trim().length < 2) {
      errors['name'] = 'Must be at least 2 characters.';
    }
    if (!$context.notes.flatMap((x) => x.steps).some((x) => !!x.status)) {
      errors['empty'] = 'Empty settings are boring...';
    }
    if (Object.values(errors).length === 0) {
      const value = JSON.stringify($context);

      const result = await newSettingMutation({
        setting: { name, value },
      });

      loading = result.loading;

      open = false;
      settingName = '';

      if (result?.data?.createNewSetting?.setting) {
        isSaving = true;
        const { id, value, name } = result.data.createNewSetting.setting;
        const newSetting = JSON.parse(value);
        nameContext.update(() => name);
        successfulResult = {
          name,
          id,
        };
        context.update((store) => {
          newSetting.play = false;
          if (store.play) {
            newSetting.play = true;
            return newSetting;
          }
          return newSetting;
        });
      }
    }
  };

  function toggle() {
    errors = {};
    open = !open;
    successfulResult = false;
    settingName = '';
  }

  function focus(element) {
    settingName = '';
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
    background-color: pink;
    border-radius: 3px;
    font-size: 0.8em;
    justify-self: center;
    padding: 2px 10px;
    margin: 10px 0;
  }

  input {
    outline: none;
  }

  .result {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
  }

  .save-form {
    text-align: center;
  }

  small {
    color: rgb(120, 120, 120);
    min-height: 30px;
    background-color: aquamarine;
    border-radius: 3px;
    padding: 5px 6px;
    text-align: center;
  }
  .saved-result {
    display: grid;
    grid-template-columns: min-content;
    gap: 15px;
    justify-content: center;
  }
</style>

<button on:click={toggle}><i class="fas fa-save" /></button>
<Modal bind:open {loading}>
  <form class="save-form" on:submit|preventDefault={() => saveSetting(settingName)}>
    <label for="name"> Name Your Setting </label>
    <input
      type="text"
      id="name"
      placeholder="Moonlight Sonata"
      bind:value={settingName}
      use:focus />
    <button disabled={!settingName.length} type="submit"><i class="fas fa-paper-plane" /></button>
    {#each Object.entries(errors) as [, error]}<span>{error}</span>{/each}
  </form>
</Modal>

<Modal open={!!successfulResult}>
  <div class="result">
    <div>
      Saved sucessfully! If you'd like to recall this at a later time, save the name and id.
    </div>
    <div class="saved-result">
      <small>{successfulResult.name}</small>
      <small>{successfulResult.id}</small>
    </div>
  </div>
</Modal>
