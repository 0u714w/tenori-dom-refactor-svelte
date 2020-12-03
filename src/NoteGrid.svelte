<script>
  import { getContext } from 'svelte';
  import NoteRow from './NoteRow.svelte';

  const context = getContext('value');
</script>

<style>
  section {
    display: grid;
    gap: 3px;
    grid-template-rows: repeat(16, minmax(0, auto));
    margin-bottom: 30px;
  }
</style>

<section>
  {#each $context.notes as note}
    <NoteRow {...note} />
  {/each}
</section>
