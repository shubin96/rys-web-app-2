# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Repz Your Style" (RYS), a street dance competition and festival in Malaysia. The project is a front-end only application built with vanilla HTML, CSS, and JavaScript, without any build tools or frameworks.

## Development Commands

Since this is a static website with no build process:

- **Local Development**: Open HTML files directly in a browser or use a simple HTTP server
- **File Serving**: Use `python -m http.server 8000` or any static file server
- **No Build Process**: Files are ready to deploy as-is
- **No Testing Framework**: No automated tests are configured

## Architecture and Structure

### File Organization
- **HTML Pages**: Root level contains main pages (`index.html`, `register.html`, `admin.html`, `schedule.html`, `media.html`)
- **Styling**: `css/` directory contains page-specific CSS files matching HTML names
- **Scripts**: `js/` directory contains corresponding JavaScript files for each page
- **Assets**: `assets/` directory for images, videos, and media files
- **Documentation**: `docs/` directory contains project planning documents in Chinese

### Page Structure
Each page follows a consistent pattern:
- **index.html**: Main landing page with hero section, countdown timer, and image slider
- **register.html**: Event registration form with validation
- **admin.html**: Admin dashboard for content management (simple login: admin/admin123)
- **schedule.html**: Event schedule and program information
- **media.html**: Media gallery for photos and videos

### JavaScript Architecture
- **script.js**: Main functionality including image slider, mobile navigation, countdown timer
- **admin.js**: Admin panel functionality with simple authentication and content management
- **register.js**: Registration form handling and validation
- **schedule.js**: Schedule page interactions
- **media.js**: Media gallery functionality

### Key Features
- **Responsive Design**: Mobile-first approach with hamburger navigation
- **Image Slider**: Custom implementation in main page
- **Admin Panel**: Simple content management system with local storage authentication
- **Registration System**: Client-side form validation (no backend integration)
- **Countdown Timer**: Live countdown to event date

### Authentication
- Admin login uses hardcoded credentials (admin/admin123) stored in `js/admin.js:23`
- Authentication state is maintained in localStorage
- This is a demo implementation - replace with proper backend authentication for production

### Content Management
- Admin can update banner images and text content
- Changes are applied via JavaScript DOM manipulation
- No persistent storage - changes reset on page reload

### Chinese Content
All project documentation is in Chinese, indicating the target market and development context. The website content is bilingual (English/Chinese) in some sections.

## Important Notes

- This is a client-side only application with no backend services
- All data persistence relies on localStorage (temporary)
- The admin authentication is for demo purposes only
- Media files should be optimized before adding to assets directory
- The project follows a simple, traditional web development approach without modern frameworks