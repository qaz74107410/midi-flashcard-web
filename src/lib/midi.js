let midiAccess = null;
let midiInputs = [];

async function requestMIDIAccess() {
  if (navigator.requestMIDIAccess) {
    try {
      midiAccess = await navigator.requestMIDIAccess();
      return true;
    } catch (error) {
      console.error('MIDI access request failed:', error);
      return false;
    }
  } else {
    console.warn('Web MIDI API is not supported in this browser.');
    return false;
  }
}

function getMIDIInputs() {
  if (midiAccess) {
    midiInputs = Array.from(midiAccess.inputs.values());
    return midiInputs;
  }
  return [];
}

function onMIDIMessage(event, callback) {
  const [command, note] = event.data;
  // Note On event
  if (command === 144) {
    callback(note);
  }
}

function startListening(inputId, callback) {
  if (midiAccess) {
    const input = midiAccess.inputs.get(inputId);
    if (input) {
      input.onmidimessage = (event) => onMIDIMessage(event, callback);
    }
  }
}

export { requestMIDIAccess, getMIDIInputs, startListening };
