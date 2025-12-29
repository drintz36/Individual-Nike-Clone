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

    function openDropdown(el) {
        el.classList.remove('opacity-0', 'invisible', '-translate-y-3');
        el.classList.add('opacity-100', 'visible', 'translate-y-0');
    }

    function closeDropdown(el) {
        el.classList.remove('opacity-100', 'visible', 'translate-y-0');
        el.classList.add('opacity-0', 'invisible', '-translate-y-3');
    }

    // Navbar Scroll Behavior
    // Main nav: hide on scroll down, show on scroll up
    // Title bar: sticky at top
    const mainNav = document.getElementById('main-nav');
    const titleBar = document.getElementById('title-bar');
    const topNav = document.getElementById('top-nav');
    const sidebar = document.getElementById('sidebar');
    let lastScrollY = window.scrollY;
    const mainNavHeight = 60;
    const topNavHeight = topNav ? 36 : 0;
    const headerHeight = mainNavHeight + topNavHeight + 60; // main + top + shop nav
    const titleBarHeight = 81; // title bar height (51px + padding)

    // Track sticky state to prevent repeated style changes
    let isNavHidden = false;
    let isTitleBarSticky = false;

    if (mainNav && titleBar) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;
            const scrollingUp = currentScrollY < lastScrollY;

            // After scrolling past the header
            if (currentScrollY > headerHeight) {
                // Hide top nav
                if (topNav) {
                    topNav.style.height = '0px';
                    topNav.style.overflow = 'hidden';
                    topNav.style.opacity = '0';
                }

                if (scrollingDown) {
                    // Scrolling down - hide main nav, make title bar sticky at top
                    mainNav.style.transform = 'translateY(-100%)';
                    mainNav.style.position = 'fixed';
                    mainNav.style.top = '0';
                    mainNav.style.left = '0';
                    mainNav.style.right = '0';
                    mainNav.style.width = '100%';
                    mainNav.style.zIndex = '1000';

                    titleBar.style.position = 'fixed';
                    titleBar.style.top = '0';
                    titleBar.style.left = '0';
                    titleBar.style.right = '0';
                    titleBar.style.width = '100%';
                    titleBar.style.zIndex = '999';
                    titleBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    titleBar.style.marginTop = '0';
                    titleBar.style.paddingTop = '15px';
                    titleBar.style.paddingBottom = '15px';

                    // Update sidebar position - only title bar visible
                    if (sidebar) {
                        sidebar.style.top = titleBarHeight + 'px';
                        sidebar.style.height = `calc(100vh - ${titleBarHeight}px)`;
                    }

                    isNavHidden = true;
                    isTitleBarSticky = true;
                } else if (scrollingUp) {
                    // Scrolling up - show main nav, title bar below it
                    mainNav.style.transform = 'translateY(0)';
                    mainNav.style.position = 'fixed';
                    mainNav.style.top = '0';
                    mainNav.style.left = '0';
                    mainNav.style.right = '0';
                    mainNav.style.width = '100%';
                    mainNav.style.zIndex = '1000';
                    mainNav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

                    titleBar.style.position = 'fixed';
                    titleBar.style.top = mainNavHeight + 'px';
                    titleBar.style.left = '0';
                    titleBar.style.right = '0';
                    titleBar.style.width = '100%';
                    titleBar.style.zIndex = '999';
                    titleBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    titleBar.style.marginTop = '0';
                    titleBar.style.paddingTop = '15px';
                    titleBar.style.paddingBottom = '15px';

                    // Update sidebar position - nav + title bar visible
                    if (sidebar) {
                        const sidebarTop = mainNavHeight + titleBarHeight;
                        sidebar.style.top = sidebarTop + 'px';
                        sidebar.style.height = `calc(100vh - ${sidebarTop}px)`;
                    }

                    isNavHidden = false;
                    isTitleBarSticky = true;
                }
            } else {
                // At top - reset everything
                if (topNav) {
                    topNav.style.height = '36px';
                    topNav.style.overflow = '';
                    topNav.style.opacity = '1';
                }
                mainNav.style.transform = '';
                mainNav.style.position = '';
                mainNav.style.top = '';
                mainNav.style.left = '';
                mainNav.style.right = '';
                mainNav.style.width = '';
                mainNav.style.zIndex = '';
                mainNav.style.boxShadow = '';

                titleBar.style.position = '';
                titleBar.style.top = '';
                titleBar.style.left = '';
                titleBar.style.right = '';
                titleBar.style.width = '';
                titleBar.style.zIndex = '';
                titleBar.style.boxShadow = '';
                titleBar.style.marginTop = '';
                titleBar.style.paddingTop = '';
                titleBar.style.paddingBottom = '';

                // Reset sidebar position
                if (sidebar) {
                    sidebar.style.top = '';
                    sidebar.style.height = '';
                }

                isNavHidden = false;
                isTitleBarSticky = false;
            }

            lastScrollY = currentScrollY;
        });
    }
});

