var arrow;

function drawCircle() {
    var canvas = SVG("metronome").size(640, 480);
    var angle = 0;

    var color4 = '#86D800';
    var color8 = '#FFAB44';
    var color16 = '#9047DC';

    var angle4 = 360 / 4;
    var angle8 = 360 / 8;
    var angle16 = 360 / 16;

    canvas.circle(210 * 2).center(320, 240).attr({fill: "none", "stroke-width": 2});

    while (angle < 360) {
        var transform = "r" + angle + " 320 240";
        var color;
        var radius;

        if (angle % angle4 === 0) {
            color = color4;
            radius = 20;
        } else if (angle % angle8 === 0) {
            color = color8;
            radius = 15;
        } else if (angle % angle16 === 0) {
            color = color16;
            radius = 10;
        } else {
            color = '#000000';
            radius = 45;
        }
        canvas.circle(radius * 2)
            .center(320, 240 - 210)
            .rotate(angle, 320, 240)
            .fill(color).opacity(0.4)
            .stroke({color: color})
            .click(function () {
                this.remember('oldOpacity', 1);
                this.opacity(1);
            })
            .mouseover(function () {
                // this.remember('oldOpacity', this.opacity());
                // this.animate(500).opacity(1);
            })
            .mouseout(function () {
                // this.animate(500).opacity(this.remember('oldOpacity'));
            });

        angle += angle16;
    }

    arrow = canvas.group();

    arrow.add(canvas.line(320, 240, 320, 30).attr({fill: "none", "stroke-width": 2}));

    arrow.add(canvas.circle(5 * 2).center(320, 30).attr({fill: "#410182", "stroke-width": 2}));
    arrow.add(canvas.circle(7 * 2).center(320, 240).attr({fill: "#410182", "stroke-width": 2}));
    arrow.stroke({color: '#410182'});
};

function startAnimation() {
    var bpm = 1000 * 4 * 60 / 80;
    arrow.animate(bpm, '-').rotate(360, 320, 240).loop();
}

function stopAnimation() {
    arrow.finish();
}