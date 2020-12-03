<script>
  import VolumeControl from './VolumeControl.svelte';
  import TempoControl from './TempoControl.svelte';
  import ReleaseControl from './ReleaseControl.svelte';
  import WaveControl from './WaveControl.svelte';
  import OctaveControl from './OctaveControl.svelte';
</script>

<style>
  section {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 30px;
  }
</style>

<section>
  <VolumeControl />
  <TempoControl />
  <ReleaseControl />
  <WaveControl />
  <OctaveControl />
</section>
