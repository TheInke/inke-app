export const invertColor = (hex) => {
    // Remove the hash symbol if it exists
    hex = hex.replace('#', '');
    
    // Parse the hex value to get the RGB components
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Invert the RGB components
    r = (255 - r).toString(16).padStart(2, '0');
    g = (255 - g).toString(16).padStart(2, '0');
    b = (255 - b).toString(16).padStart(2, '0');
    
    // Combine the inverted components and return as a hex color
    return `#${r}${g}${b}`;
  };