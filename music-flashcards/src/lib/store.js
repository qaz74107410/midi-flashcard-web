import { writable } from 'svelte/store';

export const clef = writable('treble');
export const noteRange = writable({ min: 60, max: 72 }); // MIDI note numbers for C4 to C5
export const accidentals = writable(['n']);
export const currentNote = writable('C/4');
