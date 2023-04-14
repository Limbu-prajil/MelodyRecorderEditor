const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const validateNote = (note) => {
  const noteIndex = chromaticScale.indexOf(note);
  const invalidNote = noteIndex === -1 ? true : false
  if(invalidNote) {
    throw new Error(`Invalid note given: ${note}
      Should be one of: ${chromaticScale}`)
      return false;
  }
  return noteIndex;
}

/*function getNoteParts(note) {
  let name;
  let octave;
  if(note.length === 3) {
    name = note[0] + note[1];
    octave = note[2];
  } else {
    name = note[0];
    octave = note[1];
  }
  return [name, octave];
} */
// Transposes using sharps
function transposeNoteHalfStepUp(note) {
  const noteIndex = validateNote(note);
  const transposedNote = halfStepUp(noteIndex, chromaticScale);
  return transposedNote;
}
const halfStepUp = (index, chromaticScale) => {
  const note = index === 11 ? chromaticScale[0] : chromaticScale[index +1];
  return note;
}
const halfStepDown = (index, chromaticScale) => {
  const note = index === 0 ? chromaticScale[11] : chromaticScale[index -1];
  return note;
}
function transposeNoteHalfStepDown(note) {
  const noteIndex = validateNote(note);
  const transposedNote = halfStepDown(noteIndex, chromaticScale);
  return transposedNote;
}
