<script>
  import RandomButton from './RandomButton.svelte';
  import SaveSetting from './SaveSetting.svelte';
  import GetSetting from './GetSetting.svelte';
  import Reset from './Reset.svelte';
  let isSaving = false;
</script>

<style>
  div {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(4, 30px);
    gap: 10px;
    justify-content: flex-end;
    padding-right: 6px;
  }
</style>

<div>
  <RandomButton />
  <GetSetting bind:isSaving />
  <SaveSetting bind:isSaving />
  <Reset />
</div>
