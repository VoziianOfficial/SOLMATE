"use strict";

/* ==========================================================
   Solmate — Services Page Script
   Page-specific enhancements only.
   Shared rendering is handled by main.js:
   - header
   - footer
   - service cards
   - FAQ
   - cookie banner
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on services page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initServicesPage);

    function initServicesPage() {
        initServiceAtlasHover();
        refreshIcons();
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function initServiceAtlasHover() {
        const cards = document.querySelectorAll(".service-atlas-card");

        if (!cards.length) return;

        cards.forEach((card) => {
            card.addEventListener("pointerenter", () => {
                cards.forEach((item) => {
                    item.classList.toggle("is-dimmed", item !== card);
                });
            });

            card.addEventListener("pointerleave", () => {
                cards.forEach((item) => {
                    item.classList.remove("is-dimmed");
                });
            });
        });
    }
})();