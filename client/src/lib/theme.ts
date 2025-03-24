// Apply custom theme configuration for the application
// This helps ensure consistent colors throughout the app

export const theme = {
  // Primary color - purple shade (similar to #6200EA from the design)
  primary: "#6200EA",
  
  // Accent color - blue shade (similar to #00B0FF from the design)
  accent: "#00B0FF",
  
  // Success color for correct answers (#00E676 from the design)
  success: "#00E676",
  
  // Error color for incorrect answers (#FF1744 from the design)
  error: "#FF1744",
  
  // Warning color for notifications (#FFAB00 from the design)
  warning: "#FFAB00",
  
  // Background colors
  background: {
    default: "#121212",
    surface: "#1E1E1E",
    card: "#2A2A2A"
  },
  
  // Font families
  fontFamily: {
    heading: "'Orbitron', sans-serif",
    body: "'Inter', sans-serif"
  }
};

// Apply theme to CSS variables
export function applyTheme() {
  const root = document.documentElement;
  
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-light', '#7C4DFF');
  root.style.setProperty('--primary-dark', '#4A148C');
  
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-light', '#40C4FF');
  root.style.setProperty('--accent-dark', '#0091EA');
  
  root.style.setProperty('--success', theme.success);
  root.style.setProperty('--error', theme.error);
  root.style.setProperty('--warning', theme.warning);
  
  root.style.setProperty('--background', theme.background.default);
  root.style.setProperty('--surface', theme.background.surface);
  root.style.setProperty('--card', theme.background.card);
  
  // Add cybersecurity-themed background
  document.body.style.background = `
    ${theme.background.default}
    radial-gradient(circle at 10% 20%, rgba(98, 0, 234, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 90% 50%, rgba(0, 176, 255, 0.1) 0%, transparent 25%),
    radial-gradient(circle at 40% 80%, rgba(98, 0, 234, 0.1) 0%, transparent 15%)
  `;
  document.body.style.backgroundSize = "100% 100%";
  document.body.style.backgroundAttachment = "fixed";
}
