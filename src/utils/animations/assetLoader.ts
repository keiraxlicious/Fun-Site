// src/utils/animations/assetLoader.ts

/**
 * Maximum number of retry attempts for loading assets
 */
const MAX_RETRY_COUNT = 3;

/**
 * Time to wait between retries in milliseconds
 */
const RETRY_DELAY_MS = 500;

/**
 * Interface for tracked asset
 */
interface TrackedAsset {
  path: string;
  element: HTMLImageElement | SVGElement;
  loaded: boolean;
}

/**
 * Cache of loaded assets to prevent duplicate loading
 */
const assetCache: Map<string, TrackedAsset> = new Map();

/**
 * Loads SVG assets from provided paths
 * 
 * @param paths - Array of SVG file paths to load
 * @returns Promise resolving to array of SVG elements
 */
export async function loadSvgAssets(
  paths: string[]
): Promise<SVGElement[]> {
  // Validate input
  if (!paths || paths.length === 0) {
    console.warn("No SVG paths provided");
    return [];
  }

  // Enforce upper bound on paths length
  const maxPaths = 50;
  if (paths.length > maxPaths) {
    console.warn(`Too many SVG paths (${paths.length}), limiting to ${maxPaths}`);
    paths = paths.slice(0, maxPaths);
  }

  const assets: SVGElement[] = [];
  const loadPromises: Promise<void>[] = [];

  // Create a bounded loop with explicit limit check
  for (let i = 0; i < paths.length; i++) {
    if (i >= maxPaths) {
      console.error("Path index exceeded maximum bound");
      break;
    }

    const path = paths[i];
    
    // Skip invalid paths
    if (!path) {
      console.warn(`Invalid path at index ${i}`);
      continue;
    }

    // Check if asset is already cached
    if (assetCache.has(path)) {
      const cachedAsset = assetCache.get(path);
      if (cachedAsset && cachedAsset.loaded) {
        assets.push(cachedAsset.element as SVGElement);
        continue;
      }
    }

    // Load new asset with retry logic
    loadPromises.push(
      loadSvgWithRetry(path, i, assets)
    );
  }

  // Wait for all assets to load
  try {
    await Promise.all(loadPromises);
    return assets;
  } catch (error) {
    console.error("Failed to load some SVG assets:", error);
    return assets.filter(Boolean);
  }
}

/**
 * Loads an SVG asset with retry logic
 * 
 * @param path - Path to SVG file
 * @param index - Index in the assets array
 * @param assets - Array to store loaded assets
 * @returns Promise that resolves when asset is loaded or max retries reached
 */
async function loadSvgWithRetry(
  path: string, 
  index: number, 
  assets: SVGElement[]
): Promise<void> {
  let retryCount = 0;
  let success = false;

  while (retryCount < MAX_RETRY_COUNT && !success) {
    try {
      const svgElement = await fetchSvg(path);
      assets[index] = svgElement;
      
      // Cache the loaded asset
      assetCache.set(path, {
        path,
        element: svgElement,
        loaded: true
      });
      
      success = true;
    } catch (error) {
      retryCount++;
      console.warn(`Retry ${retryCount}/${MAX_RETRY_COUNT} loading SVG: ${path}`);
      
      // Wait before next retry
      if (retryCount < MAX_RETRY_COUNT) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        console.error(`Failed to load SVG after ${MAX_RETRY_COUNT} attempts: ${path}`);
      }
    }
  }
}

/**
 * Fetches an SVG file and converts it to an SVG element
 * 
 * @param path - Path to SVG file
 * @returns Promise resolving to SVG element
 */
async function fetchSvg(path: string): Promise<SVGElement> {
  const response = await fetch(path);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch SVG: ${path} (${response.status})`);
  }
  
  const svgText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  
  // Check for parsing errors
  const errorNode = doc.querySelector("parsererror");
  if (errorNode) {
    throw new Error(`SVG parsing error: ${path}`);
  }
  
  const svgElement = doc.documentElement;
  
  // Validate that we got an SVG
  if (svgElement.nodeName !== "svg") {
    throw new Error(`Response is not an SVG: ${path}`);
  }
  
  return svgElement.cloneNode(true) as SVGElement;
}

/**
 * Loads image assets from provided paths
 * 
 * @param paths - Array of image file paths to load
 * @returns Promise resolving to array of Image elements
 */
export async function loadImageAssets(
  paths: string[]
): Promise<HTMLImageElement[]> {
  // Validate input
  if (!paths || paths.length === 0) {
    console.warn("No image paths provided");
    return [];
  }

  // Enforce upper bound on paths length
  const maxPaths = 50;
  if (paths.length > maxPaths) {
    console.warn(`Too many image paths (${paths.length}), limiting to ${maxPaths}`);
    paths = paths.slice(0, maxPaths);
  }

  const assets: HTMLImageElement[] = [];
  const loadPromises: Promise<void>[] = [];

  // Create a bounded loop with explicit limit check
  for (let i = 0; i < paths.length; i++) {
    if (i >= maxPaths) {
      console.error("Path index exceeded maximum bound");
      break;
    }

    const path = paths[i];
    
    // Skip invalid paths
    if (!path) {
      console.warn(`Invalid path at index ${i}`);
      continue;
    }

    // Check if asset is already cached
    if (assetCache.has(path)) {
      const cachedAsset = assetCache.get(path);
      if (cachedAsset && cachedAsset.loaded) {
        assets.push(cachedAsset.element as HTMLImageElement);
        continue;
      }
    }

    // Load new asset with retry logic
    loadPromises.push(
      loadImageWithRetry(path, i, assets)
    );
  }

  // Wait for all assets to load
  try {
    await Promise.all(loadPromises);
    return assets;
  } catch (error) {
    console.error("Failed to load some image assets:", error);
    return assets.filter(Boolean);
  }
}

/**
 * Loads an image asset with retry logic
 * 
 * @param path - Path to image file
 * @param index - Index in the assets array
 * @param assets - Array to store loaded assets
 * @returns Promise that resolves when asset is loaded or max retries reached
 */
async function loadImageWithRetry(
  path: string, 
  index: number, 
  assets: HTMLImageElement[]
): Promise<void> {
  let retryCount = 0;
  let success = false;

  while (retryCount < MAX_RETRY_COUNT && !success) {
    try {
      const image = await loadImage(path);
      assets[index] = image;
      
      // Cache the loaded asset
      assetCache.set(path, {
        path,
        element: image,
        loaded: true
      });
      
      success = true;
    } catch (error) {
      retryCount++;
      console.warn(`Retry ${retryCount}/${MAX_RETRY_COUNT} loading image: ${path}`);
      
      // Wait before next retry
      if (retryCount < MAX_RETRY_COUNT) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        console.error(`Failed to load image after ${MAX_RETRY_COUNT} attempts: ${path}`);
      }
    }
  }
}

/**
 * Loads an image file
 * 
 * @param path - Path to image file
 * @returns Promise resolving to Image element
 */
function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Set up load and error handlers
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
    
    // Set crossOrigin if it's not a relative URL
    if (path.startsWith('http')) {
      img.crossOrigin = 'anonymous';
    }
    
    // Start loading
    img.src = path;
    
    // Check for cached images
    if (img.complete) {
      resolve(img);
    }
  });
}

/**
 * Clears the asset cache
 */
export function clearAssetCache(): void {
  assetCache.clear();
}

/**
 * Checks if all assets in the given directory are available
 * by testing the first asset
 * 
 * @param directory - Directory path to check
 * @param extension - File extension to check for
 * @returns Promise resolving to boolean indicating if assets are available
 */
export async function areAssetsAvailable(
  directory: string,
  extension: string = 'svg'
): Promise<boolean> {
  // Validate input
  if (!directory) {
    return false;
  }

  // Ensure directory ends with a slash
  const dir = directory.endsWith('/') ? directory : `${directory}/`;
  
  // Try to load the first asset
  try {
    const path = `${dir}1.${extension}`;
    if (extension === 'svg') {
      await fetchSvg(path);
    } else {
      await loadImage(path);
    }
    return true;
  } catch (error) {
    console.warn(`Assets not available at ${dir}`);
    return false;
  }
}
