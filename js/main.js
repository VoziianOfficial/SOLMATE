"use strict";

/* ==========================================================
   Solmate — Global Site Script
   Handles:
   - config safety
   - page meta
   - favicon links
   - shared sticky header
   - services dropdown
   - full-screen mobile menu
   - shared footer
   - dynamic config injection
   - service cards
   - FAQ accordions
   - FAQ schema
   - cookie / policy banner
   - contact form validation
   - safe links
   - responsive header offset
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing. Make sure /js/config.js loads before /js/main.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initSite);

    function initSite() {
        applyPageMeta();
        applyFavicons();

        renderHeader();
        renderFooter();

        injectDynamicContent();
        renderServiceCards();
        renderFaqBlocks();
        renderFaqSchema();
        renderPolicyBanner();

        initHeaderScroll();
        initServicesDropdown();
        initMobileMenu();
        initFaqAccordions();
        initForms();
        preventEmptyLinks();
        preventHorizontalOverflow();

        updateHeaderOffset();
        refreshIcons();

        window.addEventListener("resize", debounce(updateHeaderOffset, 120));
        window.addEventListener("load", updateHeaderOffset);

        document.documentElement.classList.add("site-ready");
    }

    /* ==========================================================
       Page helpers
       ========================================================== */

    function getCurrentPage() {
        const path = window.location.pathname.split("/").pop();
        return path || "index.html";
    }

    function isServiceDetailPage(page) {
        return Array.isArray(config.services) && config.services.some((service) => service.href === page);
    }

    function getCurrentService() {
        const page = getCurrentPage();

        if (!Array.isArray(config.services)) return null;

        return config.services.find((service) => service.href === page) || null;
    }

    function getFaqKey() {
        const page = getCurrentPage();
        const service = getCurrentService();

        if (service) return service.id;

        if (page === "index.html") return "home";
        if (page === "services.html") return "services";
        if (page === "about.html") return "about";
        if (page === "contact.html") return "contact";

        return null;
    }

    function isActiveLink(href) {
        const page = getCurrentPage();

        if (page === href) return true;

        if (href === "services.html" && isServiceDetailPage(page)) {
            return true;
        }

        return false;
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, "&#096;");
    }

    function debounce(callback, wait) {
        let timeoutId;

        return function debouncedFunction() {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(callback, wait);
        };
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    /* ==========================================================
       Meta / favicon
       ========================================================== */

    function applyPageMeta() {
        const page = getCurrentPage();
        const meta = config.pageMeta && config.pageMeta[page];

        if (!meta) {
            console.warn(`No page meta found for ${page}. Add it to SITE_CONFIG.pageMeta.`);
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let descriptionTag = document.querySelector('meta[name="description"]');

            if (!descriptionTag) {
                descriptionTag = document.createElement("meta");
                descriptionTag.setAttribute("name", "description");
                document.head.appendChild(descriptionTag);
            }

            descriptionTag.setAttribute("content", meta.description);
        }
    }

    function applyFavicons() {
        const svgPath = config.assets && config.assets.faviconSvg;
        const icoPath = config.assets && config.assets.faviconIco;

        if (svgPath && !document.querySelector('link[rel="icon"][type="image/svg+xml"]')) {
            const svgIcon = document.createElement("link");
            svgIcon.rel = "icon";
            svgIcon.type = "image/svg+xml";
            svgIcon.href = svgPath;
            document.head.appendChild(svgIcon);
        }

        if (icoPath && !document.querySelector('link[rel="shortcut icon"]')) {
            const icoIcon = document.createElement("link");
            icoIcon.rel = "shortcut icon";
            icoIcon.href = icoPath;
            document.head.appendChild(icoIcon);
        }
    }

    /* ==========================================================
       Header
       ========================================================== */

    function renderHeader() {
        const mount = document.querySelector("[data-site-header]");

        if (!mount) return;

        const navigation = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];

        const navMarkup = navigation
            .map((item) => {
                const isServices = item.href === "services.html";
                const activeClass = isActiveLink(item.href) ? " is-active" : "";

                if (isServices) {
                    return `
            <div class="site-nav__item site-nav__item--services${activeClass}" data-services-dropdown>
              <a class="site-nav__link" href="${escapeAttribute(item.href)}" data-services-trigger>
                <span>${escapeHtml(item.label)}</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </a>

              <div class="services-dropdown" data-services-panel>
                <div class="services-dropdown__inner">
                  <div class="services-dropdown__intro">
                    <span class="services-dropdown__eyebrow">Solar categories</span>
                    <strong>Compare provider options by service type.</strong>
                    <p>
                      Solmate helps organize independent solar provider options.
                      Homeowners verify details directly with providers.
                    </p>
                  </div>

                  <div class="services-dropdown__links">
                    ${services
                            .map((service) => {
                                return `
                          <a class="services-dropdown__link" href="${escapeAttribute(service.href)}">
                            <span class="services-dropdown__icon">
                              <i data-lucide="${escapeAttribute(service.icon)}" aria-hidden="true"></i>
                            </span>
                            <span>
                              <strong>${escapeHtml(service.title)}</strong>
                              <small>${escapeHtml(service.summary)}</small>
                            </span>
                          </a>
                        `;
                            })
                            .join("")}

                    <a class="services-dropdown__link services-dropdown__link--all" href="services.html">
                      <span class="services-dropdown__icon">
                        <i data-lucide="layout-grid" aria-hidden="true"></i>
                      </span>
                      <span>
                        <strong>All Services</strong>
                        <small>View all solar service categories.</small>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
                }

                return `
          <a class="site-nav__link${activeClass}" href="${escapeAttribute(item.href)}">
            ${escapeHtml(item.label)}
          </a>
        `;
            })
            .join("");

        const mobileServicesMarkup = services
            .map((service) => {
                return `
          <a class="mobile-menu__service" href="${escapeAttribute(service.href)}">
            <span>
              <i data-lucide="${escapeAttribute(service.icon)}" aria-hidden="true"></i>
            </span>
            <strong>${escapeHtml(service.title)}</strong>
          </a>
        `;
            })
            .join("");

        mount.innerHTML = `
      <header class="site-header" data-header>
        <div class="site-header__shell">
          <a class="site-logo" href="index.html" aria-label="${escapeAttribute(config.brand.logoLabel)}">
            <span class="site-logo__mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img" focusable="false">
                <circle cx="32" cy="32" r="11"></circle>
                <path d="M32 4v10"></path>
                <path d="M32 50v10"></path>
                <path d="M4 32h10"></path>
                <path d="M50 32h10"></path>
                <path d="M12.2 12.2l7.1 7.1"></path>
                <path d="M44.7 44.7l7.1 7.1"></path>
                <path d="M51.8 12.2l-7.1 7.1"></path>
                <path d="M19.3 44.7l-7.1 7.1"></path>
                <path d="M25 7.5l2.1 9.4"></path>
                <path d="M39 56.5l-2.1-9.4"></path>
                <path d="M56.5 25l-9.4 2.1"></path>
                <path d="M7.5 39l9.4-2.1"></path>
                <path d="M22 32h20"></path>
                <path d="M25 26.8h14"></path>
                <path d="M25 37.2h14"></path>
              </svg>
            </span>
            <span class="site-logo__text" data-company-name>${escapeHtml(config.brand.logoText)}</span>
          </a>

          <nav class="site-nav" aria-label="Primary navigation">
            ${navMarkup}
          </nav>

          <div class="site-header__actions">
            <a class="header-icon-btn header-icon-btn--mobile-phone" href="${escapeAttribute(config.phoneHref)}" aria-label="${escapeAttribute(config.phoneLabel)}">
              <i data-lucide="phone" aria-hidden="true"></i>
            </a>

            <a class="header-icon-btn header-icon-btn--desktop" href="${escapeAttribute(config.phoneHref)}" aria-label="${escapeAttribute(config.phoneLabel)}" data-phone-link>
              <i data-lucide="phone" aria-hidden="true"></i>
            </a>

            <a class="header-icon-btn header-icon-btn--desktop" href="mailto:${escapeAttribute(config.email)}" aria-label="Email ${escapeAttribute(config.companyName)}" data-email-link>
              <i data-lucide="mail" aria-hidden="true"></i>
            </a>

            <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" data-menu-open>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <aside class="mobile-menu" id="mobileMenu" hidden inert data-mobile-menu>
        <div class="mobile-menu__backdrop" data-menu-close></div>

        <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div class="mobile-menu__top">
            <a class="site-logo site-logo--mobile" href="index.html" aria-label="${escapeAttribute(config.brand.logoLabel)}">
              <span class="site-logo__mark" aria-hidden="true">
                <svg viewBox="0 0 64 64" role="img" focusable="false">
                  <circle cx="32" cy="32" r="11"></circle>
                  <path d="M32 4v10"></path>
                  <path d="M32 50v10"></path>
                  <path d="M4 32h10"></path>
                  <path d="M50 32h10"></path>
                  <path d="M12.2 12.2l7.1 7.1"></path>
                  <path d="M44.7 44.7l7.1 7.1"></path>
                  <path d="M51.8 12.2l-7.1 7.1"></path>
                  <path d="M19.3 44.7l-7.1 7.1"></path>
                  <path d="M22 32h20"></path>
                  <path d="M25 26.8h14"></path>
                  <path d="M25 37.2h14"></path>
                </svg>
              </span>
              <span class="site-logo__text">${escapeHtml(config.brand.logoText)}</span>
            </a>

            <button class="mobile-menu__close" type="button" aria-label="Close menu" data-menu-close>
              <i data-lucide="x" aria-hidden="true"></i>
            </button>
          </div>

          <nav class="mobile-menu__nav" aria-label="Mobile navigation">
            ${navigation
                .map((item) => {
                    return `
                  <a class="${isActiveLink(item.href) ? "is-active" : ""}" href="${escapeAttribute(item.href)}">
                    ${escapeHtml(item.label)}
                  </a>
                `;
                })
                .join("")}
          </nav>

          <div class="mobile-menu__services">
            <div class="mobile-menu__section-title">
              <span>Services</span>
              <small>Solar provider categories</small>
            </div>

            <div class="mobile-menu__service-list" data-mobile-services-list>
              ${mobileServicesMarkup}

              <a class="mobile-menu__service mobile-menu__service--all" href="services.html">
                <span>
                  <i data-lucide="layout-grid" aria-hidden="true"></i>
                </span>
                <strong>All Services</strong>
              </a>
            </div>
          </div>

          <div class="mobile-menu__contact">
            <a href="${escapeAttribute(config.phoneHref)}" data-phone-link>
              <i data-lucide="phone" aria-hidden="true"></i>
              <span data-phone-text>${escapeHtml(config.phone)}</span>
            </a>

            <a href="mailto:${escapeAttribute(config.email)}" data-email-link>
              <i data-lucide="mail" aria-hidden="true"></i>
              <span data-email-text>${escapeHtml(config.email)}</span>
            </a>
          </div>

          <p class="mobile-menu__note">
            Solmate is an independent provider-matching platform. Providers are independent.
          </p>
        </div>
      </aside>
    `;
    }

    function initHeaderScroll() {
        const header = document.querySelector("[data-header]");

        if (!header) return;

        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    function updateHeaderOffset() {
        const header = document.querySelector("[data-header]");

        if (!header) return;

        const headerHeight = Math.ceil(header.getBoundingClientRect().height);

        document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    }

    /* ==========================================================
       Services dropdown
       ========================================================== */

    function initServicesDropdown() {
        const dropdown = document.querySelector("[data-services-dropdown]");

        if (!dropdown) return;

        const trigger = dropdown.querySelector("[data-services-trigger]");
        const panel = dropdown.querySelector("[data-services-panel]");
        let closeTimer = null;

        if (!trigger || !panel) return;

        const openDropdown = () => {
            window.clearTimeout(closeTimer);
            dropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        };

        const closeDropdown = () => {
            closeTimer = window.setTimeout(() => {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }, 220);
        };

        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");

        dropdown.addEventListener("mouseenter", openDropdown);
        dropdown.addEventListener("mouseleave", closeDropdown);

        dropdown.addEventListener("focusin", openDropdown);
        dropdown.addEventListener("focusout", (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                closeDropdown();
            }
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                openDropdown();

                const firstLink = panel.querySelector("a");
                if (firstLink) firstLink.focus();
            }

            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }
        });

        panel.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }
        });
    }

    /* ==========================================================
       Mobile menu
       ========================================================== */

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-menu-open]");
        const closeButtons = document.querySelectorAll("[data-menu-close]");

        if (!menu || !openButton) return;

        let previouslyFocusedElement = null;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        const getFocusableElements = () => {
            return Array.from(menu.querySelectorAll(focusableSelector)).filter((element) => {
                return element.offsetParent !== null || element === document.activeElement;
            });
        };

        const openMenu = () => {
            previouslyFocusedElement = document.activeElement;

            menu.hidden = false;
            menu.removeAttribute("inert");

            document.body.classList.add("menu-open");
            openButton.setAttribute("aria-expanded", "true");

            window.requestAnimationFrame(() => {
                menu.classList.add("is-open");

                const firstFocusable = getFocusableElements()[0];
                if (firstFocusable) firstFocusable.focus();
            });
        };

        const closeMenu = () => {
            menu.classList.remove("is-open");
            document.body.classList.remove("menu-open");
            openButton.setAttribute("aria-expanded", "false");

            window.setTimeout(() => {
                menu.setAttribute("inert", "");
                menu.hidden = true;

                if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function") {
                    previouslyFocusedElement.focus();
                }
            }, 260);
        };

        openButton.addEventListener("click", openMenu);

        closeButtons.forEach((button) => {
            button.addEventListener("click", closeMenu);
        });

        menu.addEventListener("click", (event) => {
            const target = event.target;

            if (target instanceof Element && target.closest("a[href]")) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!menu.classList.contains("is-open")) return;

            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
            }

            if (event.key === "Tab") {
                const focusableElements = getFocusableElements();

                if (!focusableElements.length) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    /* ==========================================================
       Footer
       ========================================================== */

    function renderFooter() {
        const mount = document.querySelector("[data-site-footer]");

        if (!mount) return;

        const footerColumns = Array.isArray(config.footerColumns) ? config.footerColumns : [];
        const services = Array.isArray(config.services) ? config.services : [];
        const legalLinks = Array.isArray(config.legalLinks) ? config.legalLinks : [];

        const serviceLinks = services
            .map((service) => {
                return `<a href="${escapeAttribute(service.href)}">${escapeHtml(service.title)}</a>`;
            })
            .join("");

        const legalMarkup = legalLinks
            .map((link) => {
                return `<a href="${escapeAttribute(link.href)}">${escapeHtml(link.label)}</a>`;
            })
            .join("");

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <div class="site-footer__brand">
            <a class="site-logo site-logo--footer" href="index.html" aria-label="${escapeAttribute(config.brand.logoLabel)}">
              <span class="site-logo__mark" aria-hidden="true">
                <svg viewBox="0 0 64 64" role="img" focusable="false">
                  <circle cx="32" cy="32" r="11"></circle>
                  <path d="M32 4v10"></path>
                  <path d="M32 50v10"></path>
                  <path d="M4 32h10"></path>
                  <path d="M50 32h10"></path>
                  <path d="M12.2 12.2l7.1 7.1"></path>
                  <path d="M44.7 44.7l7.1 7.1"></path>
                  <path d="M51.8 12.2l-7.1 7.1"></path>
                  <path d="M19.3 44.7l-7.1 7.1"></path>
                  <path d="M22 32h20"></path>
                  <path d="M25 26.8h14"></path>
                  <path d="M25 37.2h14"></path>
                </svg>
              </span>
              <span class="site-logo__text" data-company-name>${escapeHtml(config.brand.logoText)}</span>
            </a>

            <p data-footer-text>${escapeHtml(config.footerText)}</p>

            <div class="site-footer__contact">
              <a href="${escapeAttribute(config.phoneHref)}" data-phone-link>
                <i data-lucide="phone" aria-hidden="true"></i>
                <span data-phone-text>${escapeHtml(config.phone)}</span>
              </a>

              <a href="mailto:${escapeAttribute(config.email)}" data-email-link>
                <i data-lucide="mail" aria-hidden="true"></i>
                <span data-email-text>${escapeHtml(config.email)}</span>
              </a>

              <span>
                <i data-lucide="map-pin" aria-hidden="true"></i>
                <span data-address-text>${escapeHtml(config.address.full)}</span>
              </span>
            </div>
          </div>

          <div class="site-footer__columns">
            ${footerColumns.length
                ? footerColumns
                    .map((column) => {
                        return `
                        <div class="site-footer__column">
                          <h2>${escapeHtml(column.title)}</h2>
                          <nav aria-label="${escapeAttribute(column.title)} links">
                            ${(column.links || [])
                                .map((link) => {
                                    return `<a href="${escapeAttribute(link.href)}">${escapeHtml(link.label)}</a>`;
                                })
                                .join("")}
                          </nav>
                        </div>
                      `;
                    })
                    .join("")
                : `
                  <div class="site-footer__column">
                    <h2>Services</h2>
                    <nav aria-label="Footer services">${serviceLinks}</nav>
                  </div>

                  <div class="site-footer__column">
                    <h2>Legal</h2>
                    <nav aria-label="Footer legal links">${legalMarkup}</nav>
                  </div>
                `
            }
          </div>

          <div class="site-footer__legal">
            <p>
              <strong data-company-id>${escapeHtml(config.companyId)}</strong>
              <span>Service area: <span data-service-area>${escapeHtml(config.serviceArea)}</span></span>
            </p>

            <p data-legal-notice>${escapeHtml(config.legalNotice)}</p>

            <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
          </div>
        </div>
      </footer>
    `;
    }

    /* ==========================================================
       Dynamic config injection
       ========================================================== */

    function injectDynamicContent() {
        setText("[data-company-name]", config.companyName);
        setText("[data-company-id]", config.companyId);
        setText("[data-phone-text]", config.phone);
        setText("[data-email-text]", config.email);
        setText("[data-address-text]", config.address && config.address.full);
        setText("[data-footer-text]", config.footerText);
        setText("[data-service-area]", config.serviceArea);
        setText("[data-disclaimer]", config.disclaimer);
        setText("[data-legal-notice]", config.legalNotice);

        setHref("[data-phone-link]", config.phoneHref);
        setHref("[data-email-link]", `mailto:${config.email}`);

        applyTemplateTokens(document.body);
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function setHref(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            if (element instanceof HTMLAnchorElement && value) {
                element.href = value;
            }
        });
    }

    function applyTemplateTokens(root) {
        if (!root) return;

        const tokens = {
            "{{companyName}}": config.companyName,
            "{{companyId}}": config.companyId,
            "{{phone}}": config.phone,
            "{{phoneHref}}": config.phoneHref,
            "{{email}}": config.email,
            "{{address}}": config.address && config.address.full,
            "{{serviceArea}}": config.serviceArea,
            "{{footerText}}": config.footerText,
            "{{legalNotice}}": config.legalNotice,
            "{{disclaimer}}": config.disclaimer
        };

        const replaceTokens = (value) => {
            let nextValue = value;

            Object.keys(tokens).forEach((token) => {
                nextValue = nextValue.split(token).join(tokens[token] || "");
            });

            return nextValue;
        };

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue || !node.nodeValue.includes("{{")) {
                    return NodeFilter.FILTER_REJECT;
                }

                const parent = node.parentElement;

                if (parent && ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            node.nodeValue = replaceTokens(node.nodeValue);
        });

        root.querySelectorAll("[title], [aria-label], [placeholder], [href]").forEach((element) => {
            ["title", "aria-label", "placeholder", "href"].forEach((attribute) => {
                const value = element.getAttribute(attribute);

                if (value && value.includes("{{")) {
                    element.setAttribute(attribute, replaceTokens(value));
                }
            });
        });
    }

    /* ==========================================================
       Service cards
       ========================================================== */

    function renderServiceCards() {
        const mounts = document.querySelectorAll("[data-service-cards]");

        if (!mounts.length || !Array.isArray(config.services)) return;

        mounts.forEach((mount) => {
            const variant = mount.getAttribute("data-service-cards") || "default";

            mount.innerHTML = config.services
                .map((service) => {
                    if (variant === "atlas") {
                        return `
              <article class="service-atlas-card">
                <a href="${escapeAttribute(service.href)}" aria-label="View ${escapeAttribute(service.title)}">
                  <img src="${escapeAttribute(service.image)}" alt="${escapeAttribute(service.title)}" loading="lazy">
                  <span class="service-atlas-card__number">${escapeHtml(service.number)}</span>
                  <span class="service-atlas-card__icon">
                    <i data-lucide="${escapeAttribute(service.icon)}" aria-hidden="true"></i>
                  </span>
                  <span class="service-atlas-card__content">
                    <strong>${escapeHtml(service.title)}</strong>
                    <small>${escapeHtml(service.cardText || service.summary)}</small>
                  </span>
                </a>
              </article>
            `;
                    }

                    return `
            <article class="service-photo-card">
              <a href="${escapeAttribute(service.href)}" aria-label="View ${escapeAttribute(service.title)}">
                <img src="${escapeAttribute(service.image)}" alt="${escapeAttribute(service.title)}" loading="lazy">
                <span class="service-photo-card__shade" aria-hidden="true"></span>
                <span class="service-photo-card__icon">
                  <i data-lucide="${escapeAttribute(service.icon)}" aria-hidden="true"></i>
                </span>
                <span class="service-photo-card__content">
                  <small>${escapeHtml(service.number)} / ${escapeHtml(service.shortTitle)}</small>
                  <strong>${escapeHtml(service.title)}</strong>
                  <span>${escapeHtml(service.summary)}</span>
                </span>
              </a>
            </article>
          `;
                })
                .join("");
        });

        refreshIcons();
    }

    /* ==========================================================
       FAQ
       ========================================================== */

    function renderFaqBlocks() {
        const mounts = document.querySelectorAll("[data-faq-list]");

        if (!mounts.length || !config.faqs) return;

        mounts.forEach((mount) => {
            const explicitKey = mount.getAttribute("data-faq-list");
            const faqKey = explicitKey && explicitKey !== "auto" ? explicitKey : getFaqKey();
            const faqs = faqKey && config.faqs[faqKey];

            if (!Array.isArray(faqs) || !faqs.length) {
                mount.innerHTML = "";
                return;
            }

            mount.innerHTML = faqs
                .map((item, index) => {
                    const itemId = `${faqKey}-faq-${index + 1}`;
                    const panelId = `${itemId}-panel`;

                    return `
            <article class="faq-item">
              <button class="faq-button" type="button" aria-expanded="false" aria-controls="${escapeAttribute(panelId)}">
                <span class="faq-button__text">${escapeHtml(item.question)}</span>
                <span class="faq-button__icon" aria-hidden="true">
                  <i data-lucide="plus"></i>
                </span>
              </button>

              <div class="faq-panel" id="${escapeAttribute(panelId)}" hidden>
                <div class="faq-panel__inner">
                  <p>${escapeHtml(item.answer)}</p>
                </div>
              </div>
            </article>
          `;
                })
                .join("");
        });

        refreshIcons();
    }

    function initFaqAccordions() {
        document.querySelectorAll(".faq-item").forEach((item) => {
            const button = item.querySelector(".faq-button");
            const panel = item.querySelector(".faq-panel");

            if (!button || !panel) return;

            button.addEventListener("click", () => {
                const isOpen = button.getAttribute("aria-expanded") === "true";

                button.setAttribute("aria-expanded", String(!isOpen));
                item.classList.toggle("is-open", !isOpen);

                if (isOpen) {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;

                    window.requestAnimationFrame(() => {
                        panel.style.maxHeight = "0px";
                    });

                    window.setTimeout(() => {
                        panel.hidden = true;
                        panel.style.maxHeight = "";
                    }, 260);
                } else {
                    panel.hidden = false;
                    panel.style.maxHeight = "0px";

                    window.requestAnimationFrame(() => {
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    });

                    window.setTimeout(() => {
                        panel.style.maxHeight = "none";
                    }, 280);
                }

                const icon = button.querySelector("[data-lucide]");

                if (icon) {
                    icon.setAttribute("data-lucide", isOpen ? "plus" : "minus");
                    refreshIcons();
                }
            });
        });
    }

    function renderFaqSchema() {
        const mount = document.querySelector("[data-faq-schema]");
        const faqKey = getFaqKey();
        const faqs = faqKey && config.faqs && config.faqs[faqKey];

        if (!mount || !Array.isArray(faqs) || !faqs.length) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => {
                return {
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer
                    }
                };
            })
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);

        mount.innerHTML = "";
        mount.appendChild(script);
    }

    /* ==========================================================
       Cookie / policy banner
       ========================================================== */

    function renderPolicyBanner() {
        const mount = document.querySelector("[data-policy-banner]");

        if (!mount || !config.cookieBanner) return;

        const cookieConfig = config.cookieBanner;
        const storedChoice = window.localStorage.getItem(cookieConfig.storageKey);

        if (storedChoice) {
            mount.innerHTML = "";
            return;
        }

        const linksMarkup = Array.isArray(cookieConfig.links)
            ? cookieConfig.links
                .map((link) => {
                    return `<a href="${escapeAttribute(link.href)}">${escapeHtml(link.label)}</a>`;
                })
                .join("")
            : "";

        mount.innerHTML = `
      <section class="policy-banner" role="region" aria-label="Privacy preferences">
        <div class="policy-banner__content">
          <div>
            <h2>${escapeHtml(cookieConfig.title)}</h2>
            <p>${escapeHtml(cookieConfig.text)}</p>

            <nav class="policy-banner__links" aria-label="Policy links">
              ${linksMarkup}
            </nav>
          </div>

          <div class="policy-banner__actions">
            <button class="button button--secondary button--small" type="button" data-cookie-choice="decline">
              ${escapeHtml(cookieConfig.decline)}
            </button>

            <button class="button button--primary button--small" type="button" data-cookie-choice="accept">
              ${escapeHtml(cookieConfig.accept)}
            </button>
          </div>
        </div>
      </section>
    `;

        mount.querySelectorAll("[data-cookie-choice]").forEach((button) => {
            button.addEventListener("click", () => {
                const choice = button.getAttribute("data-cookie-choice") || "decline";

                window.localStorage.setItem(cookieConfig.storageKey, choice);
                mount.querySelector(".policy-banner")?.classList.add("is-hiding");

                window.setTimeout(() => {
                    mount.innerHTML = "";
                }, 220);
            });
        });
    }

    /* ==========================================================
       Forms
       ========================================================== */

    function initForms() {
        document.querySelectorAll("form[data-site-form]").forEach((form) => {
            const message = form.querySelector("[data-form-message]");

            form.setAttribute("novalidate", "novalidate");

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const result = validateForm(form);

                if (!result.isValid) {
                    if (message) {
                        message.textContent = config.forms.errorMessage;
                        message.classList.remove("is-success");
                        message.classList.add("is-error");
                    }

                    const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");

                    if (firstInvalid && typeof firstInvalid.focus === "function") {
                        firstInvalid.focus();
                    }

                    return;
                }

                if (message) {
                    message.textContent = config.forms.successMessage;
                    message.classList.remove("is-error");
                    message.classList.add("is-success");
                }

                form.reset();

                form.querySelectorAll(".form-field").forEach((field) => {
                    field.classList.remove("is-invalid", "is-valid");
                });
            });

            form.querySelectorAll("input, select, textarea").forEach((control) => {
                control.addEventListener("input", () => {
                    validateControl(control);
                });

                control.addEventListener("blur", () => {
                    validateControl(control);
                });
            });
        });
    }

    function validateForm(form) {
        let isValid = true;

        form.querySelectorAll("input, select, textarea").forEach((control) => {
            const controlIsValid = validateControl(control);

            if (!controlIsValid) {
                isValid = false;
            }
        });

        return { isValid };
    }

    function validateControl(control) {
        const field = control.closest(".form-field");
        const error = field ? field.querySelector(".form-field__error") : null;

        if (!field) return true;

        let isValid = true;
        let errorMessage = "";

        const value = control.value.trim();
        const isRequired = control.hasAttribute("required");

        if (isRequired && !value) {
            isValid = false;
            errorMessage = control.getAttribute("data-required-message") || "This field is required.";
        }

        if (isValid && control.type === "email" && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {
                isValid = false;
                errorMessage = "Please enter a valid email address.";
            }
        }

        field.classList.toggle("is-invalid", !isValid);
        field.classList.toggle("is-valid", isValid && value.length > 0);

        if (error) {
            error.textContent = errorMessage;
        }

        return isValid;
    }

    /* ==========================================================
       Safety helpers
       ========================================================== */

    function preventEmptyLinks() {
        document.querySelectorAll('a[href="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
            });
        });
    }

    function preventHorizontalOverflow() {
        document.documentElement.classList.add("overflow-guard");

        const wideElements = Array.from(document.body.querySelectorAll("*")).filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > window.innerWidth + 2;
        });

        if (wideElements.length) {
            console.warn("Potential horizontal overflow elements:", wideElements);
        }
    }
})();