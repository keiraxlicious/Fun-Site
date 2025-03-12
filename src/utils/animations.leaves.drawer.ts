/**
 * Draw a leaf shape on the canvas
 */
export function drawLeaf(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
): void {
    // Main leaf shape
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    
    // Draw leaf outline
    ctx.bezierCurveTo(
        x + size / 3, y - size / 3,
        x + size / 2, y,
        x, y + size / 2
    );
    
    ctx.bezierCurveTo(
        x - size / 2, y,
        x - size / 3, y - size / 3,
        x, y - size / 2
    );
    
    // Fill leaf
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw leaf vein
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = size / 15;
    ctx.stroke();
    
    // Draw secondary veins
    const veins = 3;
    for (let i = 1; i <= veins; i++) {
        const yPos = y - size / 2 + (size * i) / (veins + 1);
        
        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.lineTo(x + size / 3, yPos - size / 10);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = size / 25;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.lineTo(x - size / 3, yPos - size / 10);
        ctx.stroke();
    }
}
