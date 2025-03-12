// src/utils/animations/core/asset-loader.ts
/**
 * Asset loader utility optimized for static hosting environments like GitHub Pages
 */
export class AssetLoader {
    private static cache: Record<string, string[]> = {};
  
    /**
     * Loads assets from a directory using a manifest file approach
     * @param directory - Directory path
     * @param extension - File extension filter (e.g., '.svg')
     * @returns Promise resolving to array of file URLs
     */
    static async loadFromDirectory(
      directory: string, 
      extension: string = '.svg'
    ): Promise<string[]> {
        // Normalize directory path
        const normalizedDir = directory.endsWith('/') ? directory : `${directory}/`;
        const cacheKey = `${normalizedDir}_${extension}`;
        
        // Try accessing your files directly based on the list you have
        const knownFiles = [
            "23838.svg",
            "23843.svg",
            "23857.svg",
            "23901.svg",
            "23904.svg",
            "23916.svg",
            "23956.svg",
            "23958.svg",
            "24209.svg",
            "24239.svg",
            "uu0604design_20220106_雪の結晶1.svg"
        ].map(file => `${normalizedDir}${file}`);


        const existingFiles = await Promise.all(
            knownFiles.map(async (url) => {
              try {
                const response = await fetch(url, { method: 'HEAD' });
                return response.ok ? url : null;
              } catch {
                return null;
              }
            })
          );
        
          const validFiles = existingFiles.filter(Boolean) as string[];
          if (validFiles.length > 0) {
            console.log(`Found ${validFiles.length} SVGs through direct checking`);
            return validFiles;
          }
        
      
      // Return cached results if available
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey];
      }
  
      try {
        // For GitHub Pages, an assets.json manifest is the most reliable approach
        const manifestResult = await this.loadFromManifest(normalizedDir, extension);
        if (manifestResult.length > 0) {
          this.cache[cacheKey] = manifestResult;
          return manifestResult;
        }
  
        console.warn(`No assets found in ${normalizedDir}. Please create an assets.json manifest file.`);
        console.info(`
  === IMPLEMENTATION GUIDANCE ===
  Create a file at ${normalizedDir}assets.json with your actual SVG filenames:
  {
    "files": [
      "23838.svg",
      "uu0604design_20220106_雪の結晶1.svg",
      "your-actual-filename.svg",
      "..."
    ]
  }
  ============================`);
        
        return [];
      } catch (error) {
        console.error(`Failed to load assets from ${normalizedDir}:`, error);
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
          console.log(`Manifest fetch response status: ${response.status}`);
          
          if (!response.ok) {
            console.warn(`Asset manifest not found at ${manifestUrl}`);
            return [];
          }
          
          // Parse the manifest
          const text = await response.text();
          console.log(`Manifest content: ${text.substring(0, 100)}...`);
          
          try {
            const manifest = JSON.parse(text);
            if (!Array.isArray(manifest.files)) {
              console.warn(`Invalid manifest format at ${manifestUrl}. Expected "files" array.`);
              return [];
            }
            
            // Return only the files matching our extension
            const filteredFiles = manifest.files
              .filter((file: string) => file.endsWith(extension))
              .map((file: any) => `${directory}${file}`);
            
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
  