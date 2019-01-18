(function () {
    drawCircle();

    Nexus.colors.accent = "#D4EFFE";
    Nexus.colors.fill = "#42A0D7";

    var playButton = new Nexus.TextButton('#playButton', {
        'size': [150, 50],
        'state': false,
        'text': 'Play',
        alternateText: 'Stop',
    });

    playButton.on('change', function (isPlaying) {
        if (isPlaying) {
            startAnimation();
        } else {
            stopAnimation();
        }
    });

})();