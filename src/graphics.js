var arrow;
var animation;
var time;

function drawCircle() {
    var canvas = Raphael("metronome", 640, 480), angle = 0;

    var color4 = '#86D800';
    var color8 = '#FFAB44';
    var color16 = '#9047DC';

    var angle4 = 360 / 4;
    var angle8 = 360 / 8;
    var angle16 = 360 / 16;

    canvas.circle(320, 240, 210).attr({fill: "none", "stroke-width": 2});

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
        canvas.circle(320, 450, radius)
            .attr({stroke: color, fill: color, transform: transform, "fill-opacity": .4})
            .click(function () {
                this.attr({"fill-opacity": 1});
            })
            .mouseover(function () {
                // this.animate({"fill-opacity": 1}, 500);
            })
            .mouseout(function () {
                // this.animate({"fill-opacity": .4}, 500);
            });
        angle += angle16;
    }

    arrow = canvas.set();

    arrow.push(canvas.path("M320,240 L320,30").attr({fill: "none", "stroke-width": 2}));

    arrow.push(canvas.circle(320, 30, 5).attr({fill: "#410182", "stroke-width": 2}));
    arrow.push(canvas.circle(320, 240, 7).attr({fill: "#410182", "stroke-width": 2}));
    arrow.attr({stroke: '#410182'});
};

function startAnimation() {
    var bpm = 1000 * 4 * 60 / 80;
    time = bpm;
    animationLoop();
    // animation = Raphael.animation({transform: 'r360 320 240'}, bpm, 'linear');
    // arrow.animate(animation.repeat(1000));
}

function animationLoop() {
    // animation = Raphael.animation();
    arrow.animate({transform: 'r360 320 240'}, time, 'linear', animationLoop);
}

function stopAnimation() {
    animation = Raphael.animation({transform: 'r360 320 240'}, 500, 'bounce');
    arrow.animate(animation);
}