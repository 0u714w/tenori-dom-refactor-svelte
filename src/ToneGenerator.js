import { AudioContext } from 'standardized-audio-context';
const audioContext = new AudioContext();

async function loadImpulseResponse(input) {
  let arrayBuffer;
  if (input instanceof File) {
    arrayBuffer = await input.arrayBuffer();
  } else {
    const response = await fetch(input);
    arrayBuffer = await response.arrayBuffer();
  }
  return await audioContext.decodeAudioData(arrayBuffer);
}

export default async function ToneGenerator({ frequency, wave, octave, release, volume, reverbInput }) {
  const waves = [
    'triangle',
    'sine',
    'square',
    'sawtooth',
  ];

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const compressor = audioContext.createDynamicsCompressor();
  const convolver = audioContext.createConvolver();
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

  // Load and set the impulse response for the convolver node
  if (reverbInput) {
    const impulseResponse = await loadImpulseResponse(reverbInput);
    convolver.buffer = impulseResponse;
  }

  oscillator.connect(gainNode)
    .connect(compressor)
    .connect(convolver)
    .connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + release);
}