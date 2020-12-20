<script>
  import { mutation } from '@urql/svelte';
  import { getContext } from 'svelte';
  import Modal from './Modal.svelte';

  const context = getContext('value');
  const nameContext = getContext('name');
  let open = false;
  let settingName = '';
  let errors = {};
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
    if (Object.values(errors).length === 0) {
      const value = JSON.stringify($context);

      const result = await newSettingMutation({
        setting: { name, value },
      });

      open = false;
      settingName = '';

      if (result?.data?.createNewSetting?.setting) {
        const { id } = result.data.createNewSetting.setting;

        nameContext.update(() => name);
        successfulResult = {
          name,
          id,
        };
      }
    }
  };

  const toggle = () => {
    errors = {};
    open = !open;
    successfulResult = false;
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

  .result {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
  }

  .save-form {
    text-align: center;
  }
</style>

<button on:click={toggle}><i class="fas fa-save" /></button>
<Modal bind:open>
  <div class="save-form">
    <label for="name"> Name Your Setting </label>
    <input type="text" id="name" placeholder="Moonlight Sonata" bind:value={settingName} />
    <button on:click={() => saveSetting(settingName)}><i class="fas fa-paper-plane" /></button>
    {#each Object.entries(errors) as [, error]}<span>{error}</span>{/each}
  </div>
</Modal>

<Modal open={!!successfulResult}>
  <div class="result">
    <div>
      Saved sucessfully! If you'd like to recall this at a later time, save the name and id.
    </div>
    <div>{successfulResult.name}</div>
    <div>{successfulResult.id}</div>
  </div>
</Modal>
