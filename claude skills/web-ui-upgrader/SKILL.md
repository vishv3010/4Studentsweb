---
name: web-ui-upgrader
description: Upgrade and modernize existing web pages. Use this skill whenever the user asks to "upgrade this UI", "make this look better", "modernize the design", or "improve the frontend aesthetics". It takes existing HTML/CSS/JS or React components and applies premium, modern design principles like glassmorphism, dynamic animations, and sophisticated typography.
---

# Web UI Upgrader

This skill is designed to transform basic or outdated web interfaces into premium, modern, and highly engaging designs. 

When invoked, your goal is to analyze the user's existing frontend code and apply best-in-class aesthetic upgrades while preserving the core functionality.

## Core Design Principles

1. **Premium Aesthetics Rule**: The user must be wowed. Avoid generic colors (plain red, blue, green). Use curated, harmonious color palettes (e.g., HSL tailored colors, sleek dark modes, deep gradients).
2. **Modern Typography**: Replace default fonts. Use modern geometric or sans-serif fonts from Google Fonts (e.g., `Inter`, `Plus Jakarta Sans`, `Outfit`, `Outfit`, `Manrope`). Ensure proper hierarchy (large, bold headings, readable body text).
3. **Depth and Material**: Move away from flat design. Incorporate:
    *   **Glassmorphism**: Translucent backgrounds with backdrop-blur.
    *   **Subtle Shadows**: Colored shadow tints instead of harsh black dropshadows (`box-shadow: 0 10px 30px -10px rgba(primary-color, 0.3)`).
    *   **Borders**: Soft, thin borders with low opacity to define edges.
4. **Dynamic Interaction**: The page should feel alive. Add:
    *   **Hover Effects**: Smooth transitions on buttons and cards (scale up slightly, brighten color, adjust shadow).
    *   **Micro-animations**: Subtle entrance animations for components (fade in, slide up).
5. **Space and Layout**: Embrace whitespace. Use generous padding and margins to let content breath. Use modern layouts like CSS Grid (e.g., Bento box grids for features).

## Workflow

1. **Analyze**: Review the provided source files. Understand the structure, the existing classes, and the intended functionality.
2. **Plan the Upgrade**: Decide on the target aesthetic (e.g., "Dark Mode Neon", "Clean Minimalist Glass").
3. **Execute**:
    *   **Update CSS/Styles**: This is the priority. Rewrite the CSS to implement the principles above. If the user is using Tailwind, upgrade the utility classes. If vanilla CSS, build a robust set of variables.
    *   **Update HTML/JSX**: Add necessary wrapper `div`s, update class names, or restructure elements to support the new styling (like a bento grid).
    *   **Add Assets**: If applicable, suggest or insert high-quality placeholder images or icons (e.g., from Lucide or Heroicons).
4. **Review**: Ensure no existing functionality was broken. The buttons should still click, the forms should still submit, just beautifully.

## Output Format

Always output the complete, updated code blocks for the specific files you modified. Do not output abbreviated code with comments like "/* rest of code here */". The user should be able to copy-paste the result directly. 

If multiple files are changed, clearly label which file each code block belongs to.

## Example Transformation Focus

**Before (Basic Card):**
White background, gray text, solid border, harsh black drop shadow.

**After (Premium Card):**
Subtle gradient background or dark glassmorphism, glowing inset border, soft colored outer shadow, `transform: translateY(-5px)` on hover with a 0.3s ease transition.
