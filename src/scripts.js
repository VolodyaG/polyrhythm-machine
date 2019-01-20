(function () {
    drawBeatCircle(0, [6, 4]);
    drawBeatCircle(-1, [3, 4]);

    Nexus.colors.accent = "#D4EFFE";
    Nexus.colors.fill = "#42A0D7";

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
    })

    playButton.on('change', function (isPlaying) {
        if (isPlaying) {
            console.log(bpm.value);
            startAnimation(bpm.value);
            playMusic(bpm.value);
        } else {
            stopAnimation();
            stopMusic();
        }
    });

})();