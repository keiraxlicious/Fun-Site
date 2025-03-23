/**
 * Initializes the profile card with interactive elements
 */
export function initializeProfileCard(containerId: string): void {
    const profilePic = document.querySelector(containerId) as HTMLElement;
    // Add floating animation to profile picture
    if (profilePic) {
        addFloatingEffect(profilePic);
    }
    
    // Add text animation to headings
    const headings = document.querySelectorAll('.profile-card h1, .profile-card h2');
    headings.forEach((heading, index) => {
        const element = heading as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.5s ease ${0.2 + index * 0.1}s`;
        
        // Trigger animations after a short delay
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}

/**
 * Adds a custom floating effect to an element
 * @param element - The element to animate
 */
function addFloatingEffect(element: HTMLElement): void {
    // Add subtle random movement
    let startTime = Date.now();
    
    function updatePosition() {
        const elapsed = (Date.now() - startTime) / 1000;
        
        // Calculate offsets using sine waves with different frequencies
        const offsetX = Math.sin(elapsed * 0.5) * 5;
        const offsetY = Math.sin(elapsed * 0.7) * 7;
        
        // Apply the transformation
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        // Continue animation
        requestAnimationFrame(updatePosition);
    }
    
    updatePosition();
}



/**
 * Apothecary Diaries Interactive Elements
 * Handles animations, effects, and interactive elements
 */

// Track mouse position for various effects
let mouseX = 0;
let mouseY = 0;

/**
 * Initialize all interactive elements
 */
export function initializeInteractiveElements(): void {
    // Track mouse position across the page
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Initialize profile picture effects
    initializeProfilePicture('.profile-picture-structure');
    
    // Initialize button effects
    initializeSocialButtons();
    
    // Initialize custom cursor
    initializeCustomCursor();
    
    // Initialize glowing elements
    initializeGlowEffects('.profile-picture-structure');
}

/**
 * Initialize profile picture with 3D tilt and click effects
 */
function initializeProfilePicture(containerId: string): void {
    const profilePic = document.querySelector(containerId) as HTMLElement;
    
    if (!profilePic) return;
    
    // Add 3D tilt effect based on mouse position
    profilePic.addEventListener('mousemove', (e) => {
        const rect = profilePic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate tilt based on mouse distance from center
        const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * 10;
        const tiltY = ((centerX - e.clientX) / (rect.width / 2)) * 10;
        
        // Apply the tilt transformation
        profilePic.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
    });
    
    // Reset tilt when mouse leaves
    profilePic.addEventListener('mouseleave', () => {
        profilePic.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        profilePic.style.transition = 'transform 0.5s ease';
    });
    
    // Add spin animation on click
    profilePic.addEventListener('click', () => {
        profilePic.style.transition = 'transform 1s cubic-bezier(0.13, 0.84, 0.42, 1)';
        profilePic.style.transform = 'perspective(1000px) rotateY(360deg)';
        
        // Reset after animation completes
        setTimeout(() => {
            profilePic.style.transition = 'transform 0.5s ease';
            profilePic.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }, 1000);
    });
}

/**
 * Initialize social buttons with platform-specific effects
 */
function initializeSocialButtons(): void {
    const buttons = document.querySelectorAll('.social-button-structure') as NodeListOf<HTMLElement>;
    
    buttons.forEach((button, index) => {
        // Set unique data attributes based on index for varied animations
        button.dataset.buttonIndex = index.toString();
        
        // Add mouse-move light effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for hover effect
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Add click animation
        button.addEventListener('click', () => {
            // Remove existing animation class if present
            button.classList.remove('button-clicked');
            
            // Trigger reflow to restart animation
            void button.offsetWidth;
            
            // Add animation class
            button.classList.add('button-clicked');
            
            // Create and add potion bubbles on click
            createPotionBubbles(button);
        });
    });
}

/**
 * Create potion bubble particles when buttons are clicked
 */
function createPotionBubbles(button: HTMLElement): void {
    const rect = button.getBoundingClientRect();
    const bubbleCount = 8;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'potion-bubble-particle';
        
        // Randomize bubble properties
        const size = Math.random() * 15 + 5;
        const xPos = Math.random() * rect.width;
        const yPos = Math.random() * rect.height;
        const duration = Math.random() * 1 + 1;
        const delay = Math.random() * 0.3;
        
        // Set random colors based on theme
        const colors = [
            'var(--color-pink)',
            'var(--color-turquoise)',
            'var(--color-gold)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Style the bubble
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${xPos}px`;
        bubble.style.top = `${yPos}px`;
        bubble.style.background = color;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        // Add to button and remove when animation completes
        button.appendChild(bubble);
        setTimeout(() => {
            bubble.remove();
        }, (duration + delay) * 1000);
    }
}

/**
 * Initialize custom cursor
 */
function initializeCustomCursor(): void {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorBg = document.createElement('div');
    cursorBg.className = 'cursor-bg';
    
    // Add to DOM
    document.body.appendChild(cursor);
    document.body.appendChild(cursorBg);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorBg.style.left = `${e.clientX}px`;
        cursorBg.style.top = `${e.clientY}px`;
    });
    
    // Add effects for clickable elements
    const clickables = document.querySelectorAll('a, button, .social-button-structure, .sidebar-toggle-structure');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorBg.classList.add('cursor-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorBg.classList.remove('cursor-active');
        });
    });
}

/**
 * Initialize glowing elements
 */
function initializeGlowEffects(containerId: string): void {
    const profileCard = document.querySelector(containerId) as HTMLElement;
    if (profileCard) {
        createGlowingDots(profileCard);
    }
}

/**
 * Create glowing dots pattern for background
 */
function createGlowingDots(container: HTMLElement): void {
    const dotCount = 15;
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'glowing-dot';
        
        // Random position within container
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 4 + 2;
        
        // Random color
        const colors = [
            'var(--color-pink-transparent)',
            'var(--color-turquoise-transparent)',
            'var(--color-gold-transparent)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        
        // Style the dot
        dot.style.left = `${xPos}%`;
        dot.style.top = `${yPos}%`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.background = color;
        dot.style.animationDuration = `${duration}s`;
        dot.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(dot);
    }
}
