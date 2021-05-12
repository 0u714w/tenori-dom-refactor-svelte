<script>
  import { tenoriState } from './stores';
  import NoteRow from './NoteRow.svelte';
</script>

<section>
  {#each $tenoriState.notes as note}
    <NoteRow {...note} />
  {/each}
</section>

<style>
  section {
    display: grid;
    gap: 3px;
    grid-template-rows: repeat(16, minmax(0, auto));
    margin-bottom: 30px;
  }
</style>
