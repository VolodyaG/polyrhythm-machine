Tone.Transport.PPQ = 24;
// Tone.Master.volume.value = -10;

var sampler = new Tone.Sampler({
    // "C3" : "https://raw.githubusercontent.com/VolodyaG/polyrhythm-machine/poc/src/samples/bongo_1.wav",
    "C3": "./samples/bongo_1.wav",
    // "A3" : "https://raw.githubusercontent.com/VolodyaG/polyrhythm-machine/poc/src/samples/bongo_2.wav",
    "A3": "./samples/bongo_2.wav",
}).toMaster();

var part;


function playMusic(bpm, basePulse, additionalPulse) {
    Tone.Transport.bpm.value = additionalPulse ? additionalPulse[0] * bpm : bpm;
    Tone.Transport.timeSignature = getToneJsTimeSignature(basePulse, additionalPulse);

    var notes = generateToneJsNotes();

    part = new Tone.Part(function (time, value) {
        sampler.triggerAttack(value.note, time);
    }, notes).start(0);

    part.loop = true;

    Tone.Transport.start();
}

function stopMusic() {
    part.stop();
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

function generateToneJsNotes() {
    var partEvents = [];

    beatsState[0].note = 'C3';
    beatsState[-2].note = 'A3';

    for (var beatId in beatsState) {
        var beat = beatsState[beatId];
        if (beat.ticksToPlay.length > 0) {
            partEvents = partEvents.concat(generateTonejsPartEventsFromBeat(beat));
        }
    }

    return partEvents;
}

function generateTonejsPartEventsFromBeat(beat) {
    var multiplySignatureNumberForBeatPulse = getMultiplySignatureNumberForBeatPulse(beat.timeSignature);

    var notes = beat.ticksToPlay.map(function (tick) {
        var convertedBeatTimeInTicks = tick * multiplySignatureNumberForBeatPulse;
        return {"time": convertedBeatTimeInTicks + 'i', "note": beat.note};
    });

    return notes;
}

function getMultiplySignatureNumberForBeatPulse(pulse) {
    var fourBeatsPulse = pulse[0] / (pulse[1] / 4);
    return Tone.Transport.timeSignature / fourBeatsPulse;
}