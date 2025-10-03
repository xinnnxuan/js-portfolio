# FREEGAME Portfolio Template

A modern, responsive portfolio template designed for athletes and sports professionals. This template features a bold, high-contrast design with multiple sections showcasing different aspects of the FREEGAME brand.

## Features

- **Fully Responsive**: Works on all devices from mobile to desktop
- **Scrollable Design**: Smooth scrolling between sections
- **Modern Typography**: Clean, professional fonts optimized for readability
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Modular CSS**: Organized stylesheets for easy customization
- **Performance Optimized**: Efficient JavaScript and CSS for fast loading

## File Structure

```
js-portfolio/
├── index.html              # Main HTML file
├── css/                    # Stylesheets
│   ├── reset.css          # CSS reset and base styles
│   ├── base.css           # CSS variables and utilities
│   ├── typography.css     # Font styles and text formatting
│   ├── layout.css         # Page layout and positioning
│   ├── components.css     # Reusable UI components
│   └── responsive.css     # Mobile-first responsive design
├── js/                     # JavaScript files
│   └── main.js            # Main application logic
├── assets/                 # Images and media
│   └── placeholder-generator.html  # Tool to generate placeholder images
└── README.md              # This file
```

## CSS File Organization

### reset.css
- Browser default style resets
- Consistent cross-browser styling
- Box-sizing and basic element styles

### base.css
- CSS custom properties (variables)
- Global utility classes
- Base typography and spacing
- Color scheme definitions

### typography.css
- Font imports and declarations
- Text styling for all elements
- Responsive font sizes
- Font weight and spacing

### layout.css
- Page structure and positioning
- Grid and flexbox layouts
- Section-specific styling
- Hero sections and content areas

### components.css
- Reusable UI components
- Button styles and hover effects
- Card components
- Animation keyframes
- Interactive elements

### responsive.css
- Mobile-first responsive design
- Breakpoints for different screen sizes
- Adaptive layouts and typography
- Print and accessibility styles

## JavaScript Features

### main.js
- Smooth scrolling navigation
- Scroll-triggered animations
- Interactive element handlers
- Performance optimizations
- Parallax effects
- Image lazy loading

## Getting Started

1. **Open the template**: Open `index.html` in your web browser
2. **Generate images**: Open `assets/placeholder-generator.html` to create placeholder images
3. **Customize content**: Edit the HTML to add your own content
4. **Modify styles**: Update CSS files to match your brand
5. **Add functionality**: Extend JavaScript for additional features

## Customization

### Colors
Update CSS variables in `base.css`:
```css
:root {
    --primary-black: #000000;
    --primary-white: #FFFFFF;
    --primary-gray: #808080;
}
```

### Typography
Modify font imports in `typography.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');
```

### Layout
Adjust spacing and sizing in `layout.css`:
```css
.hero-section {
    height: 100vh;
    padding: var(--spacing-2xl);
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- Optimized images with lazy loading
- Minified CSS and JavaScript (in production)
- Efficient scroll event handling
- CSS animations with hardware acceleration

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences

## License

This template is free to use for personal and commercial projects.

## Support

For questions or issues, please refer to the code comments or create an issue in the repository.
