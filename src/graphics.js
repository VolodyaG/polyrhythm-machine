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
    beatsState[position] = {
        ticksToPlay: [],
        timeSignature: timeSignature,
    };

    var diameter = _calculateBeatCircleDiameter(position);
    var radius = diameter / 2;

    canvas.circle(diameter)
        .center(centerX, centerY)
        .attr({fill: "none", "stroke-width": 2});

    var circleStartY = centerY - radius;

    _createBeats(position, timeSignature, circleStartY);
    _updateArrow(circleStartY);
}

function startAnimation(bpm) {
    var time = 4 * 60 * 1000 / bpm;
    arrow.animate(time, '-').rotate(360, 320, 240).loop();
}

function stopAnimation() {
    arrow.finish();
}

// position - relative position of the circle: -1,0,1,2 where 0 is the first central circle
function _calculateBeatCircleDiameter(position) {
    var maxDiameter = Math.min(sizeX, sizeY) - 20;
    var minDiameter = maxDiameter / 2;

    var centralCircle = (maxDiameter + minDiameter) / 2;

    var circleStep = (maxDiameter - centralCircle) / 2; // Assume we could add only 2 circles in each direction for now

    return centralCircle + (position * circleStep);
}

function _createBeats(position, timeSignature, circleStartY) {
    var beatsCount = timeSignature[0];
    var ticksInCircle = (timeSignature[0] / (timeSignature[1] / 4)) * 24;

    var oneCircleStep = 360 / ticksInCircle;

    for (var currentTick = 0; currentTick < ticksInCircle; currentTick++) {
        var beatProps = _getBeatButtonProps(currentTick, timeSignature);

        if (!beatProps) {
            continue;
        }

        var currentAngle = oneCircleStep * currentTick;

        canvas.circle(beatProps.radius * 2)
            .center(centerX, circleStartY)
            .rotate(currentAngle, centerX, centerY)
            .fill(beatProps.color).opacity(0.5)
            .stroke({fill: beatProps.color, width: 2, color: '#ffffff'})
            .remember({beatTick: currentTick, isChosen: false, beatId: position})
            .click(function () {
                var isBeatChosenToPlayNow = !this.remember('isChosen');
                this.remember('isChosen', isBeatChosenToPlayNow);
                this.opacity(isBeatChosenToPlayNow ? 1 : 0.5);

                var beatState = beatsState[this.remember('beatId')];
                var beatTick = this.remember('beatTick');

                if (isBeatChosenToPlayNow) {
                    beatState.ticksToPlay.push(beatTick);
                } else {
                    beatState.ticksToPlay = beatState.ticksToPlay.filter(function (value) {
                        return value !== beatTick
                    });
                }
            });
    }
}

function _getBeatButtonProps(currentTick, timeSignature) {
    var color;
    var radius;

    var quaterNotesDimension = timeSignature[1] / 4; // How much 4th notes divided. e.g. for 4/4 = 1, 4/16 = 4

    if (quaterNotesDimension === 1 && currentTick % 24 === 0) {
        color = color4;
        radius = 15;
    } else if (quaterNotesDimension <= 2 && currentTick % 12 === 0) {
        color = color8;
        radius = 13;
    } else if (quaterNotesDimension <= 4 && currentTick % 6 === 0) {
        color = color16;
        radius = 11;
    } else {
        return;
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

function convertToFourBeatTimeSignature(pulse) {
    var fourBeatsPulse = pulse[0] / (pulse[1] / 4);
    return [fourBeatsPulse, pulse[1]]
}