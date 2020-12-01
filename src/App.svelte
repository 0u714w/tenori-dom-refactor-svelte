<script>
  import createInitialState from './InitialState';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import NoteGrid from './NoteGrid.svelte';
  import StartStop from './StartStop';
  import Controls from './Controls.svelte';
  const initialState = writable(createInitialState());
  const tempo = writable(0.8);
  setContext('value', initialState);
  setContext('tempo', tempo);
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
  .App {
    display: grid;
    gap: 10px;
  }
</style>

<div class="App">
  <StartStop />
  <NoteGrid />
  <Controls />
</div>
