<script>
  import createInitialState from './InitialState';
  import TestQuery from './TestQuery.svelte';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import NoteGrid from './NoteGrid.svelte';
  import StartStop from './StartStop';
  import Controls from './Controls.svelte';
  import { initClient } from '@urql/svelte';

  initClient({
    url: 'https://tenori-api.herokuapp.com/',
  });

  const initialState = writable(createInitialState());
  const tempo = writable(800);
  const currentStep = writable(1);
  setContext('value', initialState);
  setContext('tempo', tempo);
  setContext('currentStep', currentStep);
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Apercu', Helvetica, sans-serif;
    background-color: rgb(28, 28, 28);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
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
    margin: auto;
    background-color: white;
    width: 80%;
    padding: 5px;
    border-radius: 3px;
    font-size: 1.3em;
  }
  :global(button) {
    transition: 0.28s ease-in-out;
  }

  :global(button:hover) {
    color: rgb(120, 120, 120);
    transform: scale(1.4, 1.4);
    transition: 0.2s ease-in-out;
  }

  @media (max-width: 767px) {
    .App {
      width: 100%;
      font-size: 1em;
    }
  }
</style>

<div class="App">
  <TestQuery />
  <StartStop />
  <NoteGrid />
  <Controls />
</div>
