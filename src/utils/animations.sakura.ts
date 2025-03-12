import { SakuraPetal } from "../types/interfaces";
/**
 * Initialize a sakura petals overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */
export function initSakuraAnimation(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
): void {
    // Create sakura petals
    const petals: SakuraPetal[] = [];
    const PETAL_COUNT = 50;
    
    // Initialize petals
    for (let i = 0; i < PETAL_COUNT; i++) {
        petals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1
        });
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update each petal
        petals.forEach(petal => {
            ctx.save();
            ctx.translate(petal.x, petal.y);
            ctx.rotate((petal.rotation * Math.PI) / 180);
            
            // Draw petal (simple oval shape)
            ctx.beginPath();
            ctx.ellipse(0, 0, petal.size, petal.size / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 183, 197, ${petal.opacity})`;
            ctx.fill();
            
            ctx.restore();
            
            // Update position and rotation
            petal.y += petal.speed;
            petal.x += Math.sin(petal.y * 0.01) * 1;
            petal.rotation += petal.rotationSpeed;
            
            // Reset if off screen
            if (petal.y > canvas.height) {
                petal.y = -petal.size;
                petal.x = Math.random() * canvas.width;
            }
        });
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    animate();
}
