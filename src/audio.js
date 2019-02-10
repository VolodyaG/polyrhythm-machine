Tone.Transport.PPQ = 24;
// Tone.Master.volume.value = -10;

var sampler = new Tone.Sampler({
    // "C3" : "https://raw.githubusercontent.com/VolodyaG/polyrhythm-machine/poc/src/samples/bongo_1.wav",
    "C3": "./samples/bongo_1.wav",
    // "A3" : "https://raw.githubusercontent.com/VolodyaG/polyrhythm-machine/poc/src/samples/bongo_2.wav",
    "A3": "./samples/bongo_2.wav",
}).toMaster();


function playMusic(bpm, basePulse, additionalPulse) {
    Tone.Transport.bpm.value = additionalPulse ? additionalPulse[0] * bpm : bpm;
    Tone.Transport.timeSignature = getToneJsTimeSignature(basePulse, additionalPulse);

    var notes = generateToneJsNotes();

    var part = new Tone.Part(function (time, value) {
        sampler.triggerAttack(value.note, time);
    }, notes).start(0);

    part.loop = true;

    Tone.Transport.start();
}

function stopMusic() {
    Tone.Transport.stop();
}

function getToneJsTimeSignature(basePulse, additionalPulse) {
    var timeSignature;

    if (additionalPulse) {
        if (basePulse[1] !== additionalPulse[1]) {
            throw 'Wrong time signatures';
        }

        var multipliedPulseSize = basePulse[0] * additionalPulse[0];
        var timeSignature = [multipliedPulseSize, basePulse[1]];
    } else {
        timeSignature = basePulse;
    }
    return timeSignature;
}

function generateToneJsNotes(beats) {
    var beat1 = {
        note: 'C3',
        timeSignature: [4, 4],
        beatInTicks: [0, 24, 48, 72],
    };

    var beat2 = {
        note: 'A3',
        timeSignature: [3, 4],
        beatInTicks: [0, 24, 48],
    };

    var beat1Events = generateTonejsPartEventsFromBeat(beat1);
    var beat2Events = generateTonejsPartEventsFromBeat(beat2);
    return beat1Events.concat(beat2Events);
}

function generateTonejsPartEventsFromBeat(beat) {
    var notes = [];

    for (var i = 0; i < beat.beatInTicks.length; i++) {
        var convertedBeatTimeInTicks = beat.beatInTicks[i] * getMultiplySignatureNumberForBeatPulse(beat.timeSignature);
        var toneJsTime;

        var currentBeat = Math.trunc(convertedBeatTimeInTicks / 24);
        toneJsTime = '0:' + currentBeat;

        var subdivisionOfBeat = convertedBeatTimeInTicks - (currentBeat * 24);

        if (subdivisionOfBeat !== 0) {
            toneJsTime += ':' + subdivisionOfBeat;
        }

        notes.push({"time": toneJsTime, "note": beat.note});
    }

    return notes;
}

function getMultiplySignatureNumberForBeatPulse(pulse) {
    var fourBeatsPulse = pulse[0] / (pulse[1] / 4);
    return Tone.Transport.timeSignature / fourBeatsPulse;
}