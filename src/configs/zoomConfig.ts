export function preventZoom(): void {
    // Prevent zooming with Ctrl + scroll
    document.addEventListener("wheel", (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    });
  
    // Prevent zooming with Ctrl/Command + +/- keys
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "-")) {
        event.preventDefault();
      }
    });
  }