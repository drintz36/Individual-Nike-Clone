document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    let leaveTimeout = null;
    let activeDropdown = null;

    navItems.forEach(item => {
        const dropdown = item.querySelector('.nav-dropdown');

        if (!dropdown) return;

        // 1. Mouse Enter Item (Header Link)
        item.addEventListener('mouseenter', () => {
            // Cancel any pending close timer (we are back in a safe zone or moving to new one)
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }

            // Instant Switch: Close any other active dropdown
            if (activeDropdown && activeDropdown !== dropdown) {
                closeDropdown(activeDropdown);
            }

            // Open this dropdown
            openDropdown(dropdown);
            activeDropdown = dropdown;
        });

        // 2. Mouse Leave Item (Header Link)
        item.addEventListener('mouseleave', (e) => {
            // If we are moving TO the dropdown, we need to wait.
            // But we can't easily detect "moving to dropdown" across a real gap without a timer.
            // So we set a timer.
            leaveTimeout = setTimeout(() => {
                closeDropdown(dropdown);
                if (activeDropdown === dropdown) activeDropdown = null;
            }, 200); // 200ms to cross the 36px gap
        });

        // 3. Mouse Enter Dropdown
        dropdown.addEventListener('mouseenter', () => {
            // We made it across the gap! Cancel the close timer.
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }
        });

        // 4. Mouse Leave Dropdown
        dropdown.addEventListener('mouseleave', () => {
            // Close efficiently. Maybe a shorter grace period or instant?
            // "Fast disappear when not hover" -> rapid close.
            // Let's give a tiny grace (100ms) just in case of jitter, but essentially fast.
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

    // Product Carousel Scroll
    const scrollContainer = document.getElementById('product-scroll-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (scrollContainer && prevBtn && nextBtn) {
        const updateButtons = () => {
            // Disable prev button if at start
            prevBtn.disabled = scrollContainer.scrollLeft <= 5;

            // Check if at end (with tolerance)
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            nextBtn.disabled = Math.ceil(scrollContainer.scrollLeft) >= maxScroll - 5;
        };

        scrollContainer.addEventListener('scroll', updateButtons);
        // Initial state
        setTimeout(updateButtons, 100); // Small delay to ensure layout is ready

        prevBtn.addEventListener('click', () => {
            const scrollAmount = scrollContainer.firstElementChild.clientWidth + 12; // width + margin
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = scrollContainer.firstElementChild.clientWidth + 12; // width + margin
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});
