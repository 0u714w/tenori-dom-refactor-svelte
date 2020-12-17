<script>
  import { mutation } from '@urql/svelte';
  import { getContext } from 'svelte';

  const context = getContext('value');

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

  const saveSetting = async () => {
    console.log($context);
    const value = JSON.stringify($context);
    const result = await newSettingMutation({
      setting: { name: 'First New Setting', value },
    });
    console.log('here is the mutation result', result);
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

<button on:click={(e) => saveSetting(e)}><i class="fas fa-save" /></button>
