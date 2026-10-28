const particleCount = 50; // default in the code is 50, but maybe let's bump it to 500 for better measuring
const particles = [];
for (let i = 0; i < 500; i++) {
    particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
    });
}

function original() {
    let strokes = 0;
    particles.forEach((particle, i) => {
        particles.forEach((particle2, j) => {
            if (i !== j) {
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    strokes++;
                }
            }
        });
    });
    return strokes;
}

function optimized() {
    let strokes = 0;
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
            const particle2 = particles[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                strokes++;
            }
        }
    }
    return strokes;
}

console.log("Original strokes:", original());
console.log("Optimized strokes (should be half):", optimized());

const startOrig = performance.now();
for (let k = 0; k < 100; k++) original();
const endOrig = performance.now();

const startOpt = performance.now();
for (let k = 0; k < 100; k++) optimized();
const endOpt = performance.now();

console.log(`Original time: ${endOrig - startOrig} ms`);
console.log(`Optimized time: ${endOpt - startOpt} ms`);
