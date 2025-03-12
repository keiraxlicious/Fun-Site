
/**
 * Draw a heart shape on the canvas
 */
export function drawHeart(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
): void {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    
    // Left bump
    ctx.bezierCurveTo(
        x - size / 2, y - size / 2,
        x - size, y,
        x, y + size
    );
    
    // Right bump
    ctx.bezierCurveTo(
        x + size, y,
        x + size / 2, y - size / 2,
        x, y + size / 4
    );
    
    ctx.fillStyle = color;
    ctx.fill();
}
