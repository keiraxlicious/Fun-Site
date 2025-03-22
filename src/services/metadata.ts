// src/services/metadata.ts
export interface Metadata {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: string; // Default: "website"
  }
export interface PageMetadata {
    [path: string]: {
      title: string;
      description: string;
      image: string;
      url: string;
      type?: string;
    };
  }
  
  export function applyMetadata(metadata: Metadata): void {
    const head = document.head;
  
    // Helper function to create meta tags
    const createMetaTag = (property: string, content: string) => {
      const meta = document.createElement("meta");
      meta.setAttribute(property.startsWith("og:") ? "property" : "name", property);
      meta.setAttribute("content", content);
      head.appendChild(meta);
    };
  
    // Clear existing metadata to avoid duplicates
    const existingMetaTags = head.querySelectorAll("meta[property^='og:'], meta[name^='twitter:']");
    existingMetaTags.forEach((tag) => tag.remove());
  
    // Apply Open Graph metadata
    createMetaTag("og:title", metadata.title);
    createMetaTag("og:description", metadata.description);
    createMetaTag("og:image", metadata.image);
    createMetaTag("og:url", metadata.url);
    createMetaTag("og:type", metadata.type || "website");
  
    // Apply Twitter Card metadata
    createMetaTag("twitter:card", "summary_large_image");
    createMetaTag("twitter:title", metadata.title);
    createMetaTag("twitter:description", metadata.description);
    createMetaTag("twitter:image", metadata.image);
  
    // Optionally set the document title
    document.title = metadata.title;
  }
  