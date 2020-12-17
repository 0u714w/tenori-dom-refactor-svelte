<script>
  import RandomButton from './RandomButton.svelte';
  import SaveSetting from './SaveSetting.svelte';
</script>

<style>
  div {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 30px);
    gap: 10px;
    justify-content: flex-end;
    padding-right: 6px;
  }
  button {
    border: none;
    appearance: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
  }
</style>

<div>
  <RandomButton />
  <button><i class="fas fa-file-download" /></button>
  <SaveSetting />
</div>
