/**
 * Adds interactive animations to a button element
 * @param element - The button element to animate
 */
export function addButtonAnimations(element) {
    // Maximum rotation angle (in degrees)
    const MAX_ROTATION = 5;
    // Maximum scale factor
    const MAX_SCALE = 1.1;
    element.addEventListener('mouseover', () => {
        // Random rotation within bounds
        const rotateX = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
        const rotateY = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
        // Apply the transform
        element.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${MAX_SCALE})
        `;
        // Add glow effect
        element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
    });
    element.addEventListener('mouseout', () => {
        // Reset transforms
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
    element.addEventListener('click', () => {
        // Pop animation on click
        element.classList.add('button-pop');
        // Remove the class after animation completes
        setTimeout(() => {
            element.classList.remove('button-pop');
        }, 300);
    });
}
/**
 * Initialize a snow overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */
export function initSnowAnimation(canvas, ctx) {
    // Create snow particles
    const particles = [];
    const PARTICLE_COUNT = 100;
    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw and update each particle
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            // Update position
            p.y += p.speed;
            p.x += Math.sin(p.y * 0.01) * 0.5;
            // Reset if off screen
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}
//# sourceMappingURL=animations.snow.js.map