"use strict";

/* ==========================================================
   Solmate — Service Detail Page Script
   Handles:
   - service-specific content injection
   - service hero content
   - overview content
   - compare cards
   - mixed photo band
   - service process
   - service FAQ key is handled by main.js
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on service detail page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        const service = getCurrentService();

        if (!service) {
            console.error("No matching service found for this page. Check SITE_CONFIG.services href values.");
            return;
        }

        const detail = config.serviceDetails && config.serviceDetails[service.id];

        if (!detail) {
            console.error(`No service detail config found for "${service.id}".`);
            return;
        }

        injectServiceHero(service, detail);
        injectServiceOverview(service, detail);
        renderCompareCards(detail);
        renderServicePhotoBand(service, detail);
        renderServiceProcess();
        injectServiceCta(service, detail);
        initCompareCardHover();
        refreshIcons();
    }

    function getCurrentPage() {
        const path = window.location.pathname.split("/").pop();
        return path || "index.html";
    }

    function getCurrentService() {
        const page = getCurrentPage();

        if (!Array.isArray(config.services)) return null;

        return config.services.find((service) => service.href === page) || null;
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

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    /* ==========================================================
       Service hero
       ========================================================== */

    function injectServiceHero(service, detail) {
        const hero = document.querySelector("[data-service-hero]");
        const heroImage = document.querySelector("[data-service-hero-image]");
        const eyebrow = document.querySelector("[data-service-eyebrow]");
        const title = document.querySelector("[data-service-title]");
        const text = document.querySelector("[data-service-text]");

        if (heroImage && detail.heroBackground) {
            heroImage.src = detail.heroBackground;
            heroImage.alt = "";
        }

        if (eyebrow) {
            eyebrow.textContent = service.pageKicker || "Solar provider matching";
        }

        if (title) {
            title.textContent = service.heroTitle || service.title;
        }

        if (text) {
            text.textContent = service.heroText || service.summary;
        }

        if (hero) {
            hero.setAttribute("aria-label", service.title);
        }
    }

    /* ==========================================================
       Overview
       ========================================================== */

    function injectServiceOverview(service, detail) {
        const kicker = document.querySelector("[data-service-overview-kicker]");
        const title = document.querySelector("[data-service-overview-title]");
        const text = document.querySelector("[data-service-overview-text]");
        const image = document.querySelector("[data-service-overview-image]");
        const mediaTitle = document.querySelector("[data-service-media-title]");
        const mediaText = document.querySelector("[data-service-media-text]");

        if (kicker) {
            kicker.textContent = service.pageKicker || "Provider matching";
        }

        if (title) {
            title.textContent = `${service.title} provider options, organized.`;
        }

        if (text) {
            text.textContent = service.pageIntro || service.summary;
        }

        if (image && detail.overviewImage) {
            image.src = detail.overviewImage;
            image.alt = `${service.title} solar provider matching visual`;
        }

        if (mediaTitle) {
            mediaTitle.textContent = service.shortTitle || service.title;
        }

        if (mediaText) {
            mediaText.textContent = "Compare provider fit, quote scope, timing, warranties, and availability directly.";
        }
    }

    /* ==========================================================
       Compare cards
       ========================================================== */

    function renderCompareCards(detail) {
        const mount = document.querySelector("[data-service-compare-cards]");

        if (!mount || !Array.isArray(detail.compareCards)) return;

        mount.classList.remove("service-compare-grid");
        mount.classList.add("service-compare-marquee-shell");

        const cards = detail.compareCards;

        const renderCard = (card, isDuplicate = false) => {
            return `
            <article class="service-compare-marquee-card" ${isDuplicate ? 'aria-hidden="true"' : ""}>
                <span class="service-compare-marquee-card__icon" aria-hidden="true">
                    <i data-lucide="${escapeAttribute(card.icon)}"></i>
                </span>

                <div>
                    <h3>${escapeHtml(card.title)}</h3>
                    <p>${escapeHtml(card.text)}</p>
                </div>
            </article>
        `;
        };

        const firstRow = [...cards, ...cards]
            .map((card, index) => renderCard(card, index >= cards.length))
            .join("");

        const secondRow = [...cards].reverse().concat([...cards].reverse())
            .map((card, index) => renderCard(card, index >= cards.length))
            .join("");

        mount.innerHTML = `
        <div class="service-compare-marquee service-compare-marquee--left">
            <div class="service-compare-marquee__track">
                ${firstRow}
            </div>
        </div>

        <div class="service-compare-marquee service-compare-marquee--right">
            <div class="service-compare-marquee__track">
                ${secondRow}
            </div>
        </div>
    `;
    }

    function initCompareCardHover() {
        const cards = document.querySelectorAll(".service-compare-card");

        if (!cards.length) return;

        const supportsHover = window.matchMedia("(hover: hover)").matches;

        if (!supportsHover) return;

        cards.forEach((card) => {
            card.addEventListener("pointerenter", () => {
                cards.forEach((item) => {
                    item.classList.toggle("is-muted", item !== card);
                });
            });

            card.addEventListener("pointerleave", () => {
                cards.forEach((item) => {
                    item.classList.remove("is-muted");
                });
            });
        });
    }

    function renderServicePhotoBand(service, detail) {
        const mount = document.querySelector("[data-service-photo-band]");

        if (!mount || !service) return;

        const photoItems = Array.isArray(detail.photoBand) && detail.photoBand.length
            ? detail.photoBand
            : Array.isArray(service.photoBandImages) && service.photoBandImages.length
                ? service.photoBandImages.map((src) => ({
                    src,
                    alt: `${service.title} detail view`
                }))
                : [
                    {
                        src: service.image,
                        alt: `${service.title} detail view`
                    },
                    {
                        src: service.image,
                        alt: `${service.title} detail view`
                    },
                    {
                        src: service.image,
                        alt: `${service.title} detail view`
                    }
                ];

        const safeItems = photoItems.slice(0, 3);

        while (safeItems.length < 3) {
            safeItems.push({
                src: service.image,
                alt: `${service.title} detail view`
            });
        }

        mount.innerHTML = safeItems
            .map((item, index) => {
                const directionClass = index === 1
                    ? "service-photo-triangle--down"
                    : "service-photo-triangle--up";

                return `
                <figure class="service-photo-triangle ${directionClass}">
                    <img src="${escapeAttribute(item.src)}" alt="${escapeAttribute(item.alt || service.title)}" loading="lazy">
                </figure>
            `;
            })
            .join("");

        refreshIcons();
    }

    /* ==========================================================
       Process
       ========================================================== */

    function renderServiceProcess() {
        const mount = document.querySelector("[data-service-process]");

        if (!mount || !Array.isArray(config.sharedProcess)) return;

        mount.innerHTML = config.sharedProcess
            .map((step) => {
                return `
          <article class="service-process-step">
            <span class="service-process-step__number">${escapeHtml(step.number)}</span>

            <div>
              <h3>${escapeHtml(step.title)}</h3>
              <p>${escapeHtml(step.text)}</p>
            </div>
          </article>
        `;
            })
            .join("");
    }

    /* ==========================================================
       CTA
       ========================================================== */

    function injectServiceCta(service, detail) {
        const title = document.querySelector("[data-service-cta-title]");
        const text = document.querySelector("[data-service-cta-text]");
        const background = document.querySelector("[data-service-cta-image]");
        const contactButton = document.querySelector("[data-service-contact-link]");

        if (title) {
            title.textContent = `Compare ${service.shortTitle || service.title} provider options.`;
        }

        if (text) {
            text.textContent = "Start a provider-matching request with Solmate. Homeowners verify all provider details, quotes, warranties, timelines, and scope directly.";
        }

        if (background) {
            background.src = detail.heroBackground || service.image;
            background.alt = "";
        }

        if (contactButton) {
            contactButton.href = `contact.html?service=${encodeURIComponent(service.id)}#contact-form`;
        }
    }
})();