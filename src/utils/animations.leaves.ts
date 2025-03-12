import { Leaf } from "../types/interfaces";
import { drawLeaf } from "./animations.leaves.drawer";

/**
 * Initialize a falling leaves overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */
export function initLeavesAnimation(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
): void {
    // Create leaves
    const leaves: Leaf[] = [];
    const LEAF_COUNT = 30;
    const LEAF_COLORS = [
        '#a67c00', // Brown
        '#d4a216', // Gold
        '#b32900', // Red-orange
        '#7d3200', // Dark orange
        '#556b2f'  // Olive
    ];
    
    // Initialize leaves
    for (let i = 0; i < LEAF_COUNT; i++) {
        leaves.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 15,
            speed: Math.random() * 2 + 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
            sway: Math.random() * 5 + 2
        });
    }
    
    // Animation loop
// sourcery skip: avoid-function-declarations-in-blocks
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update each leaf
        leaves.forEach(leaf => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate((leaf.rotation * Math.PI) / 180);
            
            // Draw leaf shape (simple oval for now)
            drawLeaf(ctx, 0, 0, leaf.size, leaf.color);
            
            ctx.restore();
            
            // Update position with swaying motion
            leaf.y += leaf.speed;
            leaf.x += Math.sin(leaf.y * 0.01) * leaf.sway;
            leaf.rotation += leaf.rotationSpeed;
            
            // Reset if off screen
            if (leaf.y > canvas.height) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * canvas.width;
            }
        });
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    animate();
}
