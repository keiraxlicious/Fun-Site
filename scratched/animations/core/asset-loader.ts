// src/utils/animations/core/asset-loader.ts

/**
 * Asset loader utility optimized for static hosting environments like GitHub Pages
 * Implements multiple fallback strategies for reliable asset loading
 */
export class AssetLoader {
  // Cache to prevent redundant loading
  private static cache: Record<string, string[]> = {};

  /**
   * Loads assets from a directory using multiple fallback strategies
   * @param directory - Directory path (can be null/empty)
   * @param extension - File extension filter (e.g., '.svg')
   * @returns Promise resolving to array of file URLs
   */
  static async loadFromDirectory(
    directory: string | null | undefined,
    extension: string = '.svg'
  ): Promise<string[]> {
    // Handle empty directory
    if (!directory) {
      console.log('No directory provided for asset loading');
      return [];
    }

    // Normalize directory path
    const normalizedDir = directory.endsWith('/') ? directory : `${directory}/`;
    const cacheKey = `${normalizedDir}_${extension}`;

    // Check cache first
    if (this.cache[cacheKey]) {
      console.log(`Using cached assets for ${normalizedDir}`);
      return this.cache[cacheKey];
    }

    console.log(`Loading assets from ${normalizedDir} with extension ${extension}`);

    // Implement multiple loading strategies with fallbacks
    try {
      // Strategy 1: Try manifest file first (most reliable for static hosting)
      const manifestFiles = await this.loadFromManifest(normalizedDir, extension);
      if (manifestFiles.length > 0) {
        console.log(`✓ Successfully loaded ${manifestFiles.length} files from manifest`);
        this.cache[cacheKey] = manifestFiles;
        return manifestFiles;
      }

      // Strategy 2: Try numbered files (1.svg, 2.svg, etc)
      const numberedFiles = await this.loadNumberedFiles(normalizedDir, extension);
      if (numberedFiles.length > 0) {
        console.log(`✓ Successfully loaded ${numberedFiles.length} numbered files`);
        this.cache[cacheKey] = numberedFiles;
        return numberedFiles;
      }

      // Strategy 3: Try common filenames for particle types
      const typeNamedFiles = await this.loadTypeNamedFiles(normalizedDir, extension);
      if (typeNamedFiles.length > 0) {
        console.log(`✓ Successfully loaded ${typeNamedFiles.length} type-named files`);
        this.cache[cacheKey] = typeNamedFiles;
        return typeNamedFiles;
      }

      // Strategy 4: Try known hardcoded filenames
      const knownFiles = await this.loadKnownFiles(normalizedDir);
      if (knownFiles.length > 0) {
        console.log(`✓ Successfully loaded ${knownFiles.length} known files`);
        this.cache[cacheKey] = knownFiles;
        return knownFiles;
      }

      // No files found with any strategy
      console.warn(`⚠ No assets found in ${normalizedDir} with any loading strategy`);
      console.info(`
===== ASSET LOADING GUIDANCE =====
To fix this issue, try one of these approaches:

1. Create a manifest file at ${normalizedDir}assets.json:
   {
     "files": ["file1.svg", "file2.svg", "..."]
   }

2. Name your files numerically: 1.svg, 2.svg, 3.svg, etc.

3. Use common type names: snow.svg, star.svg, heart.svg, etc.

4. Check paths and file permissions
==============================`);
      return [];
    } catch (error) {
      console.error(`❌ Failed to load assets from ${normalizedDir}:`, error);
      return [];
    }
  }

  /**
   * Load assets from a manifest file
   */
  private static async loadFromManifest(
    directory: string,
    extension: string
  ): Promise<string[]> {
    try {
      // Try to fetch the asset manifest
      const manifestUrl = `${directory}assets.json?cache=${Date.now()}`;
      console.log(`Attempting to load manifest from: ${manifestUrl}`);
      
      const response = await fetch(manifestUrl);
      
      if (!response.ok) {
        console.log(`Manifest not found at ${manifestUrl}`);
        return [];
      }
      
      // Parse the manifest
      const text = await response.text();
      
      try {
        const manifest = JSON.parse(text);
        if (!Array.isArray(manifest.files)) {
          console.warn(`Invalid manifest format at ${manifestUrl}. Expected "files" array.`);
          return [];
        }
        
        // Return only the files matching our extension
        const filteredFiles = manifest.files
          .filter((file: string) => file.endsWith(extension))
          .map((file: string) => `${directory}${file}`);
        
        console.log(`Found ${filteredFiles.length} files in manifest`);
        return filteredFiles;
      } catch (jsonError) {
        console.error(`JSON parse error for ${manifestUrl}:`, jsonError);
        return [];
      }
    } catch (error) {
      console.debug(`Error loading asset manifest:`, error);
      return [];
    }
  }

  /**
   * Try to load files with numeric naming (1.svg, 2.svg, etc)
   */
  private static async loadNumberedFiles(
    directory: string,
    extension: string
  ): Promise<string[]> {
    console.log(`Checking for numbered files in ${directory}`);
    
    // Create array of numbered filenames (1.svg through 10.svg)
    const numberedPatterns = Array.from({ length: 10 }, (_, i) => 
      `${directory}${i+1}${extension}`
    );

    const checkResults = await Promise.all(
      numberedPatterns.map(async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          return response.ok ? url : null;
        } catch {
          return null;
        }
      })
    );

    const validFiles = checkResults.filter(Boolean) as string[];
    console.log(`Found ${validFiles.length} numbered files in ${directory}`);
    return validFiles;
  }

  /**
   * Try to load files with type-based naming (snow.svg, star.svg, etc)
   */
  private static async loadTypeNamedFiles(
    directory: string,
    extension: string
  ): Promise<string[]> {
    console.log(`Checking for type-named files in ${directory}`);
    
    // Common particle type names
    const typeNames = [
      'snow', 'snowflake', 'star', 'heart', 'leaf',
      'sakura', 'petal', 'rain', 'raindrop'
    ];
    
    const typePatterns = typeNames.map(name => `${directory}${name}${extension}`);

    const checkResults = await Promise.all(
      typePatterns.map(async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          return response.ok ? url : null;
        } catch {
          return null;
        }
      })
    );

    const validFiles = checkResults.filter(Boolean) as string[];
    console.log(`Found ${validFiles.length} type-named files in ${directory}`);
    return validFiles;
  }

  /**
   * Try to load from a predefined list of known filenames
   */
  private static async loadKnownFiles(directory: string): Promise<string[]> {
    console.log(`Checking for known files in ${directory}`);
    
    const knownFiles = [
      "1.svg",
      "2.svg",
      "3.svg",
      "4.svg",
      "5.svg",
      "6.svg",
      "7.svg",
      "8.svg",
      "9.svg",
      "10.svg",
      "0.svg"
    ].map(file => `${directory}${file}`);

    const checkResults = await Promise.all(
      knownFiles.map(async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          return response.ok ? url : null;
        } catch {
          return null;
        }
      })
    );

    const validFiles = checkResults.filter(Boolean) as string[];
    console.log(`Found ${validFiles.length} known files in ${directory}`);
    return validFiles;
  }

  /**
   * Loads an SVG file as text
   * @param path - Path to the SVG file
   * @returns Promise resolving to SVG content string
   */
  static async loadSVGFile(path: string): Promise<string | null> {
    try {
      const response = await fetch(path);
      
      if (!response.ok) {
        console.warn(`Failed to load SVG: ${path} (${response.status})`);
        return null;
      }
      
      // Get SVG as text
      return await response.text();
    } catch (error) {
      console.warn(`Error loading SVG file ${path}:`, error);
      return null;
    }
  }
}
