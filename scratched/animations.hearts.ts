import { Heart } from "../src/types/interfaces";

import { drawHeart } from "./animations.hearts.drawer";
/**
 * Initialize a falling hearts overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */
export function initHeartsAnimation(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
): void {
    // Create hearts
    const hearts: Heart[] = [];
    const HEART_COUNT = 40;
    
    // Initialize hearts
    for (let i = 0; i < HEART_COUNT; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            pulse: Math.random() * 0.5 + 0.5
        });
    }
    animate()
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update each heart
        hearts.forEach(heart => {
            // Calculate pulse effect
            const pulse = 1 + Math.sin(Date.now() * 0.003 * heart.pulse) * 0.2;
            
            ctx.save();
            ctx.translate(heart.x, heart.y);
            ctx.scale(pulse, pulse);
            
            // Draw heart shape
            drawHeart(ctx, 0, 0, heart.size, `rgba(255, 94, 143, ${heart.opacity})`);
            
            ctx.restore();
            
            // Update position
            heart.y += heart.speed;
            heart.x += Math.sin(heart.y * 0.05) * 0.5;
            
            // Reset if off screen
            if (heart.y > canvas.height) {
                heart.y = -heart.size;
                heart.x = Math.random() * canvas.width;
            }
        });
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    animate();
}
