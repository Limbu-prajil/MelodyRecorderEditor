let record=false;
let notes=[];
let synth;

let blackButton=document.getElementById("black-keys");
blackButton.addEventListener("click" ,playNote)
let whiteButton=document.getElementById("white-keys");
whiteButton.addEventListener("click" ,playNote)
let startRecordButton=document.getElementById("start-recording");
startRecordButton.addEventListener("click" ,startRecordHandlr);
let stopRecordButton=document.getElementById("stop-recording");
stopRecordButton.addEventListener("click" ,stopRecordHandlr);

function startRecordHandlr(evt){
   record=true;
   document.getElementById("notes-to-edit").value = '';
   document.getElementById("start-recording").style.backgroundColor = "rgb(255,0,0)";
   notes=[];
   clearEditorArea();
}

function stopRecordHandlr(evt){
   record=false;
   document.getElementById("start-recording").style.backgroundColor = "rgb(245,245,245)";
   document.getElementById("notes-to-edit").value = notes.join(' ')
}
//You need to complete this function here, to record the played notes to an array
function playNote(evt) {
  let note = evt.target.dataset.note;
  synth = synth || new Tone.Synth().toMaster();
  synth.triggerAttackRelease(note + '4', '8n');
  if(record && note!==undefined){
     notes=notes.concat(note.toString());
  }
}
//M-E
let playMelodyButton = document.getElementById('play-melody');
playMelodyButton.addEventListener('click', startPlaying);
let notesToEditInput = document.getElementById('notes-to-edit');
let editButton = document.getElementById('edit-button');
editButton.addEventListener("click",handleNoteContainerEvent)
editButton.addEventListener('click', createNotesToEdit);
let editorArea = document.getElementById('editor-area');
// Start here, fill in the function so that it empties out '#editor-area'
function clearEditorArea() {
  while (editorArea.firstChild) {
  editorArea.removeChild(editorArea.firstChild);
  }
}

function splitNotes(element) {
  return element.value.split(" ");
}

function createNoteToEdit(note) {
  let noteContainer=document.createElement("div");
  noteContainer.setAttribute('class', 'note-container');

  let buttonUp=document.createElement("BUTTON");
  buttonUp.innerText="^";
  buttonUp.setAttribute('class', 'transpose-up');
  noteContainer.appendChild(buttonUp);

  let lineBreak=document.createElement("BR");
  noteContainer.appendChild(lineBreak);

  let inputNode=document.createElement("input");
  inputNode.setAttribute('value', note);
  inputNode.setAttribute('class', 'note');
  inputNode.setAttribute('type', 'text');
  inputNode.setAttribute('size', 2);
  noteContainer.appendChild(inputNode);

  let pitchNode=document.createElement("input")
  pitchNode.setAttribute('type', 'number')
  pitchNode.setAttribute('id', 'octave')
  pitchNode.setAttribute('value', '4')
  pitchNode.setAttribute('min', '1')
  pitchNode.setAttribute('max', '8')
  noteContainer.appendChild(pitchNode);

  let selectNode=document.createElement("select");
  selectNode.setAttribute('class', 'note-length');
  let option16=document.createElement("option");
  option16.setAttribute('value', '16');
  option16.innerText="sixteenth note";
  selectNode.appendChild(option16);
  let option8=document.createElement("option");
  option8.setAttribute('value', '8');
  option8.innerText="eighth note";
  selectNode.appendChild(option8);
  let option4=document.createElement("option");
  option4.setAttribute('value', '4');
  option4.innerText="quarter note";
  selectNode.appendChild(option4);
  let option2=document.createElement("option");
  option2.setAttribute('value', '2');
  option2.innerText="half note";
  selectNode.appendChild(option2);
  let option1=document.createElement("option");
  option1.setAttribute('value', '1');
  option1.innerText="full note";
  selectNode.appendChild(option1);
  noteContainer.appendChild(selectNode);

  lineBreak=document.createElement("BR");
  noteContainer.appendChild(lineBreak);

  let buttonDown=document.createElement("BUTTON");
  buttonDown.innerText="v";
  buttonDown.setAttribute('class', 'transpose-down');
  noteContainer.appendChild(buttonDown);
return noteContainer;
}

function createNotesToEdit() {
    clearEditorArea();
    let notes=splitNotes(notesToEditInput);
   for(i=0;i<notes.length;i++){
     let noteContainer=createNoteToEdit(notes[i]);
     noteContainer.addEventListener("click", handleNoteContainerEvent )
     editorArea.appendChild(noteContainer);
   }
}

function handleNoteContainerEvent(evt) {
let el=evt.target;
  if(el.classList.contains("transpose-up")){
    let notevalue=el.parentNode.querySelector('input.note').value;
    let halfupnote=transposeNoteHalfStepUp(notevalue);
    el.parentNode.querySelector('input.note').value=halfupnote;
  }
  if(el.classList.contains("transpose-down")){
    let notevalue=el.parentNode.querySelector('input.note').value;
    let halfdownnote=transposeNoteHalfStepDown(notevalue);
    el.parentNode.querySelector('input.note').value=halfdownnote;
  }
}

function getMelodyString(containers) {
  let melodyString = ''
  for (var i = 0; i < containers.length; i++) {
    melodyString += containers[i].querySelector('.note').value;
    melodyString += containers[i].querySelector('#octave').value;
    melodyString += '/';
    melodyString += containers[i].querySelector('.note-length').value;
    melodyString += ' ';
  }
  return melodyString;
}

function startPlaying() {
  let noteContainers = document.querySelectorAll('#editor-area .note-container');
  let melody = getMelodyString(noteContainers);
  const player = new SimplePlayer();
  const sequenceParser = new SequenceParser(128, [2, 4]);
  player.play(sequenceParser.parse([
      melody
  ]));
}
