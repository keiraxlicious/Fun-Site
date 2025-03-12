/**
 * Initialize a rain overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */
export function initRainAnimation(canvas, ctx) {
    // Create rain drops
    const raindrops = [];
    const RAINDROP_COUNT = 200;
    // Initialize raindrops
    for (let i = 0; i < RAINDROP_COUNT; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 15 + 10,
            thickness: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1
        });
    }
    // Animation loop
    function animate() {
        // Apply a semi-transparent fill to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw and update each raindrop
        raindrops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.strokeStyle = `rgba(120, 160, 255, ${drop.opacity})`;
            ctx.lineWidth = drop.thickness;
            ctx.stroke();
            // Update position
            drop.y += drop.speed;
            // Reset if off screen
            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}
//# sourceMappingURL=animations.rain.js.map