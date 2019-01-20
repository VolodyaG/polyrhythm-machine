var color4 = '#86D800';
var color8 = '#FFAB44';
var color16 = '#9047DC';

var sizeX = 640;
var sizeY = 480;
var centerX = sizeX / 2;
var centerY = sizeY / 2;

var canvas = SVG("metronome").size(sizeX, sizeY);

var arrowLine;
var arrow = _createArrowGroup();

function drawBeatCircle(position, timeSignature) {
    var beatsCount = timeSignature[0];

    var diameter = _calculateBeatCircleDiameter(position);
    var radius = diameter / 2;

    canvas.circle(diameter)
        .center(centerX, centerY)
        .attr({fill: "none", "stroke-width": 2});

    var circleStartY = centerY - radius;

    _createBeats(beatsCount, circleStartY);
    _updateArrow(circleStartY);
}

function startAnimation(bpm) {
    var time =  4 * 60 * 1000 / bpm;
    arrow.animate(time, '-').rotate(360, 320, 240).loop();
}

function stopAnimation() {
    arrow.finish();
}

// position - relative position of the circle: -1,0,1,2 where 0 is the first central circle
function _calculateBeatCircleDiameter(position) {
    var maxDiameter = Math.min(sizeX, sizeY) - 20;
    var minDiamener = maxDiameter / 2;

    var centralCircle = (maxDiameter +  minDiamener) / 2;

    var circleStep = (maxDiameter - centralCircle) / 2; // Assume we could add only 2 circles in each direction for now

    return centralCircle + (position * circleStep);
}

function _createBeats(mainBeatsCount, circleStartY) {
    var angle4th = 360 / mainBeatsCount; // In code 4th it is time division. For 3/4 - 4, for 6/8 - 8;
    var angle8th = angle4th / 2;
    var angle16th = angle8th / 2;

    var angle = 0;
    while (angle < 360) {
        var beatProps = _getBeatButtonProps(angle, angle4th, angle8th, angle16th);

        canvas.circle(beatProps.radius * 2)
            .center(centerX, circleStartY)
            .rotate(angle, centerX, centerY)
            .fill(beatProps.color).opacity(0.4)
            .stroke({color: beatProps.color})
            .click(function () {
                this.opacity(1);
            })
            .mouseover(function () {
                // this.remember('oldOpacity', this.opacity());
                // this.animate(500).opacity(1);
            })
            .mouseout(function () {
                // this.animate(500).opacity(this.remember('oldOpacity'));
            });

        angle += angle16th;
    }
}

function _getBeatButtonProps(angle, angle4th, angle8th, angle16th) {
    var color;
    var radius;

    if (angle % angle4th === 0) {
        color = color4;
        radius = 20;
    } else if (angle % angle8th === 0) {
        color = color8;
        radius = 15;
    } else if (angle % angle16th === 0) {
        color = color16;
        radius = 10;
    } else {
        color = '#000000';
        radius = 45;
    }

    return {
        color: color,
        radius: radius,
    }
}
function _createArrowGroup() {
    var arrow = canvas.group();

    arrowLine = canvas.line(centerX, centerY, centerX, centerY).attr({fill: "none", "stroke-width": 2});
    arrow.add(arrowLine);
    arrow.add(canvas.circle(7 * 2).center(centerX, centerY).attr({fill: "#410182", "stroke-width": 2}));

    arrow.stroke({color: '#ff35f7'});
    return arrow;

}

function _updateArrow(circleStartY) {
    if (arrowLine.attr('y2') > circleStartY) {
        arrowLine.plot(centerX, centerY, centerX, circleStartY);
    }

    arrow.add(canvas.circle(5 * 2).center(centerX, circleStartY).attr({fill: "#410182", "stroke-width": 2}));
    arrow.front();
}