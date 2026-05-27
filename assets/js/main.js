(() => {
    const header = document.querySelector("[data-header]");
    const menu = document.querySelector("#site-menu");
    const menuButton = document.querySelector(".nav-toggle");
    const progressBar = document.querySelector("[data-progress-bar]");
    const navLinks = Array.from(document.querySelectorAll(".site-menu a"));
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const resumeDialog = document.querySelector("[data-resume-dialog]");
    const resumeOpenButtons = Array.from(document.querySelectorAll("[data-resume-open]"));
    const resumeCloseButton = document.querySelector("[data-resume-close]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const closeMenu = () => {
        if (!menu || !menuButton) return;
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
    };

    if (menu && menuButton) {
        menuButton.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    if (resumeDialog && resumeOpenButtons.length > 0) {
        const openResume = () => {
            closeMenu();
            if (typeof resumeDialog.showModal === "function") {
                resumeDialog.showModal();
                resumeCloseButton?.focus();
            } else {
                window.open("files/Salmaan Rauf Resume.pdf", "_blank", "noreferrer");
            }
        };

        const closeResume = () => {
            if (resumeDialog.open) {
                resumeDialog.close();
            }
        };

        resumeOpenButtons.forEach((button) => {
            button.addEventListener("click", openResume);
        });

        resumeCloseButton?.addEventListener("click", closeResume);

        resumeDialog.addEventListener("click", (event) => {
            if (event.target === resumeDialog) {
                closeResume();
            }
        });
    }

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    if ("IntersectionObserver" in window && navLinks.length > 0 && sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
                });
            });
        }, { threshold: 0.45 });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    const updateProgress = () => {
        if (!progressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
        progressBar.style.width = `${progress * 100}%`;

        if (header) {
            header.classList.toggle("is-scrolled", scrollTop > 8);
        }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
})();
