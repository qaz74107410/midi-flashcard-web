<script>
  import { onMount } from 'svelte';
  import MusicStaff from './lib/MusicStaff.svelte';
  import { requestMIDIAccess, getMIDIInputs, startListening } from './lib/midi.js';
  import { currentNote, noteRange, clef, accidentals } from './lib/store.js';

  let midiInputs = [];
  let selectedInputId = null;

  // Helper function to convert MIDI note number to VexFlow note format
  function midiToVexflow(midiNote) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNamesWithFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const octave = Math.floor(midiNote / 12) - 1;

    let noteName;
    if ($accidentals.includes('b')) {
      noteName = noteNamesWithFlats[midiNote % 12];
    } else {
      noteName = noteNames[midiNote % 12];
    }
    return `${noteName}/${octave}`;
  }

  // Helper function to convert VexFlow note format to MIDI note number
  function vexflowToMdi(vexflowNote) {
    const noteMap = { C: 0, 'C#': 1, 'DB': 1, D: 2, 'D#': 3, 'EB': 3, E: 4, F: 5, 'F#': 6, 'GB': 6, G: 7, 'G#': 8, 'AB': 8, A: 9, 'A#': 10, 'BB': 10, B: 11 };
    const [noteName, octaveStr] = vexflowNote.split('/');
    const octave = parseInt(octaveStr, 10);
    const noteValue = noteMap[noteName.toUpperCase()];
    return (octave + 1) * 12 + noteValue;
  }


  function generateNewNote() {
    const range = $noteRange;
    let randomMidiNote;

    do {
      randomMidiNote = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
      const noteName = midiToVexflow(randomMidiNote).split('/')[0];
      if (noteName.includes('#') && $accidentals.includes('#')) {
        break;
      }
      if (noteName.includes('b') && $accidentals.includes('b')) {
        break;
      }
      if (!noteName.includes('#') && !noteName.includes('b') && $accidentals.includes('n')) {
        break;
      }
    } while (true);

    $currentNote = midiToVexflow(randomMidiNote);
  }

  function handleMIDIMessage(note) {
    const currentMidiNote = vexflowToMidi($currentNote);
    if (note === currentMidiNote) {
      generateNewNote();
    }
  }

  onMount(async () => {
    const hasMidi = await requestMIDIAccess();
    if (hasMidi) {
      midiInputs = getMIDIInputs();
      if (midiInputs.length > 0) {
        selectedInputId = midiInputs[0].id;
        startListening(selectedInputId, handleMIDIMessage);
      }
    }
    generateNewNote()
  });

</script>

<main>
  <h1>Music Flashcards</h1>
  <MusicStaff clef={$clef} note={$currentNote} />

  {#if midiInputs.length > 0}
    <select bind:value={selectedInputId}>
      {#each midiInputs as input}
        <option value={input.id}>{input.name}</option>
      {/each}
    </select>
  {:else}
    <p>No MIDI devices found.</p>
  {/if}
</main>
