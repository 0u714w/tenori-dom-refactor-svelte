<script>
  import createInitialState from './InitialState';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import NoteGrid from './NoteGrid.svelte';
  const initialState = writable(createInitialState());
  setContext('value', initialState);
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Apercu', Helvetica, sans-serif;
  }

  @font-face {
    font-family: 'Apercu';
    font-style: normal;
    font-weight: 500;
    src: url('./apercu_regular-webfont.woff');
  }
</style>

<div class="App">
  <NoteGrid />
</div>
