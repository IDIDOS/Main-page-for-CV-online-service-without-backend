
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

let scrollHeight: number = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

canvas.width = window.innerWidth;
canvas.height = scrollHeight;

const lineCount: number = 100;
type TypeLines = [{ x: number, y: number, length: number, speed: number, color: string }];
const lines: TypeLines = [{
    x: 0,
    y: 0,
    length: 0,
    speed: 0,
    color: '',
}];

for (let i = 0; i < lineCount; i++) {
    const x: number = Math.random() * canvas.width;
    const y: number = Math.random() * canvas.height;
    const length: number = Math.random() * 100 + 50;
    const speed: number = Math.random() * 2 + 1;
    const color: string = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
    lines.push({ x, y, length, speed, color });
}

function drawLines() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (const line of lines) {
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