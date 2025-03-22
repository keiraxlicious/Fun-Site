import { ParticleSettings } from '../src/types/interfaces';

/**
 * Default particle system configuration
 */
export const defaultParticleConfig: ParticleSettings = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff9ad2" // Pink based on Apothecary Diaries theme
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#17d8c3", // Turquoise
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

/**
 * Initializes the particles background effect
 * @param containerId - ID of the container element for particles
 * @param customConfig - Optional custom particle configuration
 */
export function initializeParticles(
    containerId: string,
    customConfig?: Partial<ParticleSettings>
): void {
    // Check if particles.js is loaded
    if (typeof window.particlesJS !== 'function') {
        console.error('particles.js library not loaded');
        return;
    }
    
    try {
        // Merge default config with any custom settings
        const config = customConfig 
            ? { ...defaultParticleConfig, ...customConfig }
            : defaultParticleConfig;
            
        // Initialize particles
        window.particlesJS(containerId, config);
        
        console.log('Particles initialized successfully');
    } catch (error) {
        console.error('Failed to initialize particles:', error);
    }
}
