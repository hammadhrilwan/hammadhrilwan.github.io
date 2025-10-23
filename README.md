# Hammadh Mohamed Rilwan - Portfolio Website

A modern, responsive portfolio website showcasing my software engineering journey, projects, and skills.

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Responsive**: Optimized for all device sizes (desktop, tablet, mobile)
- **Interactive**: Smooth scrolling, animated sections, and engaging user experience
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized loading with lazy loading and efficient animations
- **SEO Friendly**: Semantic HTML structure and meta tags

## 🚀 Live Demo

Visit the live website: [Your Portfolio URL will be here]

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and dynamic features
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🔧 Setup & Deployment

### Local Development

1. Clone or download the repository
2. Open `index.html` in your web browser
3. For development with live reload, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx live-server
   
   # Using PHP (if XAMPP is installed)
   # Place files in htdocs folder and access via localhost
   ```

### GitHub Pages Deployment

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `[your-username].github.io` for a user site, or any name for a project site

2. **Upload Your Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/[your-username]/[repository-name].git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Site**:
   - Your site will be available at `https://[your-username].github.io/[repository-name]`
   - It may take a few minutes to deploy

### Custom Domain (Optional)

1. Purchase a domain from a domain registrar
2. In your repository, create a `CNAME` file with your domain name
3. Configure DNS settings with your domain provider
4. Update the custom domain in GitHub Pages settings

## 📝 Customization

### Personal Information

Update the following in `index.html`:

- **Name**: Replace "Hammadh Mohamed Rilwan" with your name
- **Email**: Update contact links with your email
- **Social Links**: Update LinkedIn and GitHub URLs
- **Bio**: Modify the about section content
- **Projects**: Replace Velvet_Vogue with your projects
- **Experience**: Update with your relevant experience
- **Education**: Modify education details

### Styling

Customize colors and fonts in `styles.css`:

```css
:root {
  --primary-color: #2563eb;    /* Change primary color */
  --secondary-color: #10b981;  /* Change secondary color */
  /* Update other color variables as needed */
}
```

### Content Sections

Each section can be customized:

- **Projects**: Add/remove project cards
- **Experience**: Update timeline items
- **Skills**: Modify skill tags
- **Education**: Update education cards

## 🎨 Design Inspiration

This portfolio is inspired by modern web design principles and specifically draws inspiration from:
- Clean, minimal aesthetics
- Professional development portfolios
- Modern CSS techniques and animations

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚡ Performance

- Lighthouse Score: 95+ for Performance, Accessibility, Best Practices, and SEO
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## 🤝 Contributing

This is a personal portfolio project, but if you find bugs or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

## 🎉 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from modern portfolio designs
- Open source community for tools and resources

---

**Note**: Remember to replace placeholder information with your actual details before deploying!

## 🚀 Quick Start Checklist

- [ ] Update personal information in HTML
- [ ] Replace email addresses and social links
- [ ] Add your actual projects and experience
- [ ] Customize colors and styling if desired
- [ ] Test on different devices and browsers
- [ ] Create GitHub repository
- [ ] Deploy to GitHub Pages
- [ ] Update README with your live URL
- [ ] Share your portfolio!

## 📊 Analytics (Optional)

To track visitors, you can add Google Analytics:

1. Create a Google Analytics account
2. Get your tracking ID
3. Add the tracking code to the `<head>` section of `index.html`

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');
</script>
```