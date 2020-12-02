export default function ToneGenerator({ frequency, wave, octave, release, volume }) {
  console.log(arguments)
  const waves = [
    'triangle',
    'sine',
    'square',
    'sawtooth',
  ];
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const compressor = audioContext.createDynamicsCompressor();
  const now = audioContext.currentTime;
  oscillator.type = waves[wave];
  oscillator.frequency.value = frequency * octave;
  compressor.threshold.setValueAtTime(-50, audioContext.currentTime);
  compressor.knee.setValueAtTime(40, audioContext.currentTime);
  compressor.ratio.setValueAtTime(12, audioContext.currentTime);
  compressor.attack.setValueAtTime(0, audioContext.currentTime);
  compressor.release.setValueAtTime(0.25, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, now + release);
  gainNode.gain.value = volume;
  oscillator.connect(gainNode)
    .connect(compressor)
    .connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + release);
  setTimeout(() => {
    audioContext.close();
  }, now + release * 1000);
}