document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    let leaveTimeout = null;
    let activeDropdown = null;

    navItems.forEach(item => {
        const dropdown = item.querySelector('.nav-dropdown');

        if (!dropdown) return;

        item.addEventListener('mouseenter', () => {
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }

            if (activeDropdown && activeDropdown !== dropdown) {
                closeDropdown(activeDropdown);
            }

            openDropdown(dropdown);
            activeDropdown = dropdown;
        });

        item.addEventListener('mouseleave', (e) => {
            leaveTimeout = setTimeout(() => {
                closeDropdown(dropdown);
                if (activeDropdown === dropdown) activeDropdown = null;
            }, 200);
        });

        dropdown.addEventListener('mouseenter', () => {
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            leaveTimeout = setTimeout(() => {
                closeDropdown(dropdown);
                if (activeDropdown === dropdown) activeDropdown = null;
            }, 100);
        });
    });

    const pageOverlay = document.getElementById('page-overlay');

    function openDropdown(el) {
        el.classList.remove('opacity-0', 'invisible', '-translate-y-3');
        el.classList.add('opacity-100', 'visible', 'translate-y-0');
        if (pageOverlay) {
            pageOverlay.classList.remove('opacity-0', 'invisible');
            pageOverlay.classList.add('opacity-100', 'visible');
        }
    }

    function closeDropdown(el) {
        el.classList.remove('opacity-100', 'visible', 'translate-y-0');
        el.classList.add('opacity-0', 'invisible', '-translate-y-3');
        if (pageOverlay) {
            pageOverlay.classList.remove('opacity-100', 'visible');
            pageOverlay.classList.add('opacity-0', 'invisible');
        }
    }

    // Sticky title bar behavior
    const topNav = document.getElementById('top-nav');
    const mainNav = document.getElementById('main-nav');
    const shopNav = document.getElementById('shop-nav');
    const titleBar = document.getElementById('title-bar');
    const titleText = document.getElementById('title-text');

    let lastScrollY = window.scrollY;
    const topNavHeight = 36;
    const mainNavHeight = 60;
    const shopNavHeight = 60;
    const headerHeight = topNavHeight + mainNavHeight + shopNavHeight; // Total header height

    if (topNav && titleBar && titleText) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Hide top nav when scrolled down
            if (currentScrollY > topNavHeight) {
                topNav.style.height = '0px';
                topNav.style.overflow = 'hidden';
                topNav.style.opacity = '0';
            } else {
                topNav.style.height = '36px';
                topNav.style.overflow = '';
                topNav.style.opacity = '1';
            }

            // Make title bar sticky after scrolling past the header
            if (currentScrollY > headerHeight) {
                // Title bar becomes sticky
                titleBar.style.position = 'fixed';
                titleBar.style.top = '0';
                titleBar.style.left = '0';
                titleBar.style.right = '0';
                titleBar.style.width = '100%';
                titleBar.style.zIndex = '999';
                titleBar.style.height = '70px';
                titleBar.style.paddingTop = '0';
                titleBar.style.paddingBottom = '0';
                titleBar.style.marginLeft = '0';
                titleBar.style.marginRight = '0';
                titleBar.style.paddingLeft = '48px';
                titleBar.style.paddingRight = '48px';
                titleBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                titleBar.style.alignItems = 'center';

                // Change MEN text to 16px
                titleText.style.fontSize = '16px';
            } else {
                // Reset title bar to default
                titleBar.style.position = '';
                titleBar.style.top = '';
                titleBar.style.left = '';
                titleBar.style.right = '';
                titleBar.style.width = '';
                titleBar.style.zIndex = '';
                titleBar.style.height = '';
                titleBar.style.paddingTop = '';
                titleBar.style.paddingBottom = '';
                titleBar.style.marginLeft = '';
                titleBar.style.marginRight = '';
                titleBar.style.paddingLeft = '';
                titleBar.style.paddingRight = '';
                titleBar.style.boxShadow = '';
                titleBar.style.alignItems = '';

                // Reset MEN text to 24px
                titleText.style.fontSize = '';
            }

            lastScrollY = currentScrollY;
        });
    }

    // Product Carousel Scroll
    const scrollContainer = document.getElementById('product-scroll-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (scrollContainer && prevBtn && nextBtn) {
        const updateButtons = () => {
            prevBtn.disabled = scrollContainer.scrollLeft <= 5;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            nextBtn.disabled = Math.ceil(scrollContainer.scrollLeft) >= maxScroll - 5;
        };

        scrollContainer.addEventListener('scroll', updateButtons);
        setTimeout(updateButtons, 100);

        prevBtn.addEventListener('click', () => {
            const scrollAmount = scrollContainer.firstElementChild.clientWidth + 12;
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = scrollContainer.firstElementChild.clientWidth + 12;
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});
