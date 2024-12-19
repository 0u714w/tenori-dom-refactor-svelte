import { writable } from '../web_modules/svelte/store.js'
import createInitialState from './InitialState.js';


export const tenoriState = writable(createInitialState());
export const tempo = writable(800);
export const currentStep = writable(1);
export const nameState = writable('');
export const timerIntervals = writable([])
export const now = writable(new Date().getTime())