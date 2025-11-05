<script>
  import { clef, noteRange, accidentals } from './store.js';

  let minNote = $noteRange.min;
  let maxNote = $noteRange.max;

  function updateNoteRange() {
    $noteRange = { min: minNote, max: maxNote };
  }
</script>

<div class="settings">
  <h2>Settings</h2>

  <div>
    <label for="clef">Clef:</label>
    <select id="clef" bind:value={$clef}>
      <option value="treble">Treble</option>
      <option value="bass">Bass</option>
    </select>
  </div>

  <div>
    <label for="min-note">Min Note (MIDI):</label>
    <input id="min-note" type="number" bind:value={minNote} on:change={updateNoteRange} />
  </div>

  <div>
    <label for="max-note">Max Note (MIDI):</label>
    <input id="max-note" type="number" bind:value={maxNote} on:change={updateNoteRange} />
  </div>

  <div>
    <label>Accidentals:</label>
    <label>
      <input type="checkbox" bind:group={$accidentals} value="n" /> Naturals
    </label>
    <label>
      <input type="checkbox" bind:group={$accidentals} value="#" /> Sharps
    </label>
    <label>
      <input type="checkbox" bind:group={$accidentals} value="b" /> Flats
    </label>
  </div>
</div>

<style>
  .settings {
    padding: 20px;
  }
  .settings div {
    margin-bottom: 15px;
  }
</style>
