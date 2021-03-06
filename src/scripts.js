(function () {
    // drawBeatCircle(2, [12, 4]);
    // drawBeatCircle(1, [12, 4]);
    drawBeatCircle(0, [4, 4]);
    drawBeatCircle(-2, [3, 4]);

    Nexus.colors.accent = "#42A0D7";
    Nexus.colors.fill = "#A0D8F9";

    var playButton = new Nexus.TextButton('#playButton', {
        'size': [150, 50],
        'state': false,
        'text': 'Play',
        alternateText: 'Stop',
    });

    var bpm = new Nexus.Number('#bpmInput',{
        'size': [60,30],
        'value': 80,
        'min': 20,
        'max': 300,
        'step': 1
    });

    playButton.on('change', function (isPlaying) {
        if (isPlaying) {
            console.log(JSON.stringify(beatsState));
            startAnimation(bpm.value);
            playMusic(bpm.value, [4, 4], [3, 4]);
        } else {
            stopAnimation();
            stopMusic();
        }
    });

})();