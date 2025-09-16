// Component loader for header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    loadComponent('header', 'components/header.html');
    
    // Load footer component
    loadComponent('footer', 'components/footer.html');
});

function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (element) {
        fetch(componentPath)
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;
                
                // If it's header, set active navigation
                if (elementId === 'header') {
                    setActiveNavigation();
                }
            })
            .catch(error => {
                console.error(`Error loading ${elementId} component:`, error);
            });
    }
}

function setActiveNavigation() {
    // Get current page from URL
    const currentPage = getCurrentPage();
    
    // Find and set active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    // Map filenames to page identifiers
    const pageMap = {
        'index.html': 'home',
        '': 'home', // Root path
        'about.html': 'about',
        'schedule.html': 'schedule',
        'media.html': 'media',
        'register.html': 'register'
    };
    
    return pageMap[filename] || 'home';
}