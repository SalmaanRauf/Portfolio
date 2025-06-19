# Salmaan Rauf - Portfolio Website

A dark futuristic portfolio website showcasing Salmaan Rauf's work in Generative AI and software engineering.

## 🚀 Features

- **Dark Futuristic Design**: Modern, sleek interface with cyberpunk aesthetics
- **Interactive WebGL Background**: Dynamic grid that responds to cursor movement
- **Skills Visualization**: Animated radial chart showing technical expertise
- **Experience Timeline**: Glowing timeline with interactive cards
- **Project Showcase**: Filterable project grid with 3D hover effects
- **Contact Form**: Validated contact form with floating labels
- **Responsive Design**: Optimized for all devices
- **Performance Optimized**: Fast loading with modern web technologies

## 🎨 Design System

### Colors
- **Primary Surface**: `#0B0F19` (true black-blue)
- **Secondary Surface**: `#111827` (lighter card)
- **Text High Emphasis**: `#E6E8EC`
- **Text Low Emphasis**: `#A1A6B3`
- **Accent A (Cyan)**: `#00E5FF`
- **Accent B (Violet)**: `#9D00FF`
- **Success**: `#2CE59B`

### Typography
- **Display**: Space Grotesk (H1-H3)
- **Body**: Inter (400/500)
- **Mono**: IBM Plex Mono (500)
- **Numbers**: Rajdhani (700)

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties and animations
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Canvas API**: WebGL-style grid animation
- **Intersection Observer**: Scroll-based animations
- **Local Storage**: Theme persistence

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   └── js/
│       └── main.js         # Main JavaScript file
├── images/
│   ├── New Linkedin.jpeg   # Profile image
│   └── favicon.ico         # Site favicon
├── files/
│   └── Salmaan Rauf Resume.pdf  # Resume download
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or download** the repository
2. **Open** `index.html` in your browser
   
   OR
   
3. **Serve locally** using a web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Visit** `http://localhost:8000` in your browser

## 🎯 Key Sections

### Hero Section
- Full-screen animated grid background
- Gradient text effects
- Floating stats bar with counters
- Call-to-action buttons

### About Section
- Profile image with glow effect
- Bio text with quick facts chips
- Responsive grid layout

### Skills Matrix
- Interactive radial chart
- Toggle between tech stack and soft skills
- Animated skill indicators

### Experience Timeline
- Vertical timeline with glowing nodes
- Interactive cards for each role
- Smooth scroll animations

### Projects Showcase
- Filterable project grid
- 3D hover effects
- Tech stack badges
- Case study links

### Contact Section
- Contact information cards
- Validated contact form
- Success notifications

## 🎨 Customization

### Colors
Update the CSS custom properties in `assets/css/main.css`:

```css
:root {
    --primary-surface: #0B0F19;
    --secondary-surface: #111827;
    --accent-a: #00E5FF;
    --accent-b: #9D00FF;
    /* ... other colors */
}
```

### Content
- Update personal information in `index.html`
- Replace profile image in `images/` folder
- Modify project cards and experience timeline
- Update contact information

### Animations
Customize animations in `assets/js/main.js`:

```javascript
// Animation timing
const animationDuration = 0.6;
const animationEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';
```

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px+ (12-column grid)
- **Tablet**: 768px-1199px (8-column grid)
- **Mobile**: 390px-767px (4-column grid)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly
- Reduced motion support

## 🚀 Performance

- Optimized images with lazy loading
- Minified CSS and JavaScript
- Efficient animations using CSS transforms
- Preloaded critical resources
- Optimized font loading

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

- **Email**: raufsalmaan1@gmail.com
- **LinkedIn**: [salmaan-rauf](https://www.linkedin.com/in/salmaan-rauf/)
- **GitHub**: [salmaanrauf](https://github.com/salmaanrauf)

---

Built with ❤️ by Salmaan Rauf

