Tone.Transport.PPQ = 24;


function playMusic(bpm) {
    Tone.Transport.bpm.value = bpm;

    // var notes = ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]];
    var notes = ["C3", "C3", "C3", "C3"];

    var synth = new Tone.MembraneSynth().toMaster();

    var seq = new Tone.Sequence(function (time, note) {
        synth.triggerAttackRelease(note, "10hz", time)
    }, notes);

    seq.start();
    Tone.Transport.start();
}

function stopMusic() {
    Tone.Transport.stop()
}