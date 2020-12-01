<script>
  import createInitialState from './InitialState';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  const initialState = writable(createInitialState());

  setContext('value', initialState);
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>

<div class="App">hi</div>
