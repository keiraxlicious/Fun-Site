/**
 * Renders the analytics chart with the provided data
 * @param container - The container element
 * @param data - The data array to render
 */
export function renderAnalyticsChart(
    container: HTMLElement,
    data: Array<{ label: string; value: number; color: string }>
): void {
    // Clear the container
    container.innerHTML = '';
    
    // Create chart container
    const chartContainer = document.createElement('div');
    chartContainer.className = 'analytics-chart-container';
    
    // Add title
    const title = document.createElement('h3');
    title.className = 'analytics-title';
    title.textContent = 'Performance Overview';
    container.appendChild(title);
    
    // Add subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'analytics-subtitle';
    subtitle.textContent = 'Data from the last 30 days';
    container.appendChild(subtitle);
    
    // Create bars for each data point
    data.forEach((item, index) => {
        // Create bar element
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.backgroundColor = item.color;
        
        // Set height based on value (percentage of max height)
        const maxHeight = 200; // px
        const height = (item.value / 100) * maxHeight;
        bar.style.height = `${height}px`;
        
        // Add animation delay
        bar.style.animationDelay = `${index * 0.1}s`;
        
        // Create label
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = item.label;
        bar.appendChild(label);
        
        // Create value display
        const value = document.createElement('div');
        value.className = 'chart-value';
        value.textContent = `${item.value}%`;
        value.style.bottom = `${height + 10}px`;
        bar.appendChild(value);
        
        // Add to container
        chartContainer.appendChild(bar);
    });
    
    container.appendChild(chartContainer);
}
