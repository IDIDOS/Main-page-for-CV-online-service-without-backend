var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
canvas.width = window.innerWidth;
canvas.height = scrollHeight;
var lineCount = 100;
var lines = [{
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        color: ''
    }];
for (var i = 0; i < lineCount; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var length_1 = Math.random() * 100 + 50;
    var speed = Math.random() * 2 + 1;
    var color = "rgb(".concat(Math.random() * 256, ", ").concat(Math.random() * 256, ", ").concat(Math.random() * 256, ")");
    lines.push({ x: x, y: y, length: length_1, speed: speed, color: color });
}
function drawLines() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        line.x -= line.speed;
        if (ctx == null) {
            break;
        }
        if (line.x < -line.length) {
            line.x = canvas.width;
        }
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length, line.y);
        ctx.stroke();
    }
    requestAnimationFrame(drawLines);
}
drawLines();
