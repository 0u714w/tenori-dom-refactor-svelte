import { writable } from 'svelte/store'
import createInitialState from './InitialState';


export const tenoriState = writable(createInitialState());
export const tempo = writable(800);
export const currentStep = writable(1);
export const nameState = writable('');
export const timerIntervals = writable([])
export const now = writable(new Date().getTime())