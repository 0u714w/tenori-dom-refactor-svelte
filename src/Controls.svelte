<script>
  import VolumeControl from './VolumeControl.svelte';
  import TempoControl from './TempoControl.svelte';
</script>

<style>
  section {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
  }
</style>

<section>
  <VolumeControl />
  <TempoControl />
</section>
