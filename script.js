const ctx = document.getElementById("life").getContext('2d');
const forceSlider = document.getElementById("forceSlider");
const forceValueLabel = document.getElementById("forceValue");
const color1Select = document.getElementById("color1");
const color2Select = document.getElementById("color2");

let particles = [];
let rules = [];

forceSlider.oninput = function() {
    forceValueLabel.innerText = this.value;
}

function draw(x, y, color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

function particle(x, y, color) {
    return {x, y, vx: 0, vy: 0, color};
}

function random() {
    return Math.random() * 400 + 50;
}

function create(number, color) {
    for (let i = 0; i < number; i++) {
        particles.push(particle(random(), random(), color));
    }
}

function addParticles(color) {
    create(50, color);
}

function addRule() {
    const color1 = color1Select.value;
    const color2 = color2Select.value;
    const force = parseFloat(forceSlider.value);
    rules.push({color1, color2, force});
}

function clearRules() {
    rules = [];
}

function applyRules() {
    particles.forEach(p1 => {
        let fx = 0, fy = 0;
        particles.forEach(p2 => {
            rules.forEach(rule => {
                if (p1.color === rule.color1 && p2.color === rule.color2) {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d > 0 && d < 80) {
                        const F = rule.force * 1 / d;
                        fx += F * dx;
                        fy += F * dy;
                    }
                }
            });
        });
        p1.vx = (p1.vx + fx) * 0.8;
        p1.vy = (p1.vy + fy) * 0.8;
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x <= 0 || p1.x >= 500) p1.vx *= -1;
        if (p1.y <= 0 || p1.y >= 500) p1.vy *= -1;
    });
}

function update() {
    ctx.clearRect(0, 0, 500, 500);
    draw(0, 0, "black", 500);
    particles.forEach(p => draw(p.x, p.y, p.color, 5));
    applyRules();
    requestAnimationFrame(update);
}

update();
