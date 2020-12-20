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
      console.log('here is the mutation result', result);
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
    background-color: red;
    border-radius: 3px;
    color: black;
    font-size: 0.8em;
    justify-self: center;
  }

  .result {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
  }
</style>

<button on:click={() => (open = !open)}><i class="fas fa-save" /></button>
<Modal bind:open>
  <div>
    <label for="name"> Name Your Setting </label>
    <input type="text" id="name" placeholder="Moonlight Sonata" bind:value={settingName} />
    <button on:click={() => saveSetting(settingName)}>Submit</button>
    {#each Object.values(errors) as error}<span>{error}</span>{/each}
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
