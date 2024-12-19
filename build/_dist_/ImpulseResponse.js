import { fft, ifft } from '../web_modules/fft-js.js';
import { complex } from '../web_modules/mathjs.js';

async function convertBFormToStereoUHJ(filename) {
    const audioContext = new AudioContext();
  
    // Fetch and decode the audio file
    const response = await fetch(filename);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
    // Separate channels
    const W = audioBuffer.getChannelData(0);
    const X = audioBuffer.getChannelData(1);
    const Y = audioBuffer.getChannelData(2);
  
    // Get number of elements for FFT
    const N = W.length;
  
    // Create p and j
    const p = 90 * Math.PI / 180;
    const j = complex(Math.cos(p), Math.sin(p));
  
    // Perform FFT
    const fftW = fft(W);
    const fftX = fft(X);
    const fftY = fft(Y);
  
    // Compute left and right channels
    const L = ifft(fftW.map((val, i) => 0.5 * (0.9397 * val + 0.18568 * fftX[i] - j * 0.342 * val + j * 0.5099 * fftX[i] + 0.655 * fftY[i])));
    const R = ifft(fftW.map((val, i) => 0.5 * (0.9397 * val + 0.18568 * fftX[i] + j * 0.342 * val - j * 0.5099 * fftX[i] - 0.655 * fftY[i])));
  
    // Create stereo output
    const stereoOut = new Float32Array(2 * N);
    for (let i = 0; i < N; i++) {
      stereoOut[2 * i] = L[i].re;
      stereoOut[2 * i + 1] = R[i].re;
    }
  
    // Create a new audio buffer for the stereo output
    const stereoBuffer = audioContext.createBuffer(2, N, audioBuffer.sampleRate);
    stereoBuffer.copyToChannel(stereoOut.subarray(0, N), 0);
    stereoBuffer.copyToChannel(stereoOut.subarray(N), 1);
  
    // Write the stereo output to a new WAV file (this requires a library like `wav-encoder`)
    const wavEncoder = require('wav-encoder');
    const stereoWav = await wavEncoder.encode({
      sampleRate: audioBuffer.sampleRate,
      channelData: [stereoBuffer.getChannelData(0), stereoBuffer.getChannelData(1)]
    });
  
    const filenameOut = `StereoUHJ_${filename}`;
    const fs = require('fs');
    fs.writeFileSync(filenameOut, new Buffer(stereoWav));
  }
  
  async function generateImpulseResponse() {
    // Your code to generate the impulse response and save it as a WAV file
    // Assuming you have the WAV data as an ArrayBuffer
    const wavData = new ArrayBuffer(); // Replace with actual WAV data generation logic
  
    // Create a Blob from the WAV data
    const blob = new Blob([wavData], { type: 'audio/wav' });
  
    // Create a File object from the Blob
    const file = new File([blob], 'impulse-response.wav', { type: 'audio/wav' });
  
    return file;
  }

  export default generateImpulseResponse;