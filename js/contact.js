"use strict";

/* ==========================================================
   Solmate — Contact Page Script
   Page-specific enhancements only.
   Shared behavior is handled by main.js:
   - header
   - footer
   - form validation
   - FAQ
   - cookie banner
   - mobile menu
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on contact page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        initServiceSelectFromUrl();
        initContactInfoHover();
        refreshIcons();
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function initServiceSelectFromUrl() {
        const select = document.querySelector("#serviceSelection");

        if (!select) return;

        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get("service");

        if (!serviceId) return;

        const option = Array.from(select.options).find((item) => item.value === serviceId);

        if (option) {
            select.value = serviceId;
            select.dispatchEvent(new Event("input", { bubbles: true }));
        }
    }

    function initContactInfoHover() {
        const items = document.querySelectorAll(".contact-info-item");

        if (!items.length) return;

        const supportsHover = window.matchMedia("(hover: hover)").matches;

        if (!supportsHover) return;

        items.forEach((item) => {
            item.addEventListener("pointerenter", () => {
                items.forEach((card) => {
                    card.classList.toggle("is-muted", card !== item);
                });
            });

            item.addEventListener("pointerleave", () => {
                items.forEach((card) => {
                    card.classList.remove("is-muted");
                });
            });
        });
    }
})();