"use strict";

/* ==========================================================
   Solmate — About Page Script
   Page-specific enhancements only.
   Shared behavior is handled by main.js:
   - header
   - footer
   - FAQ
   - cookie banner
   - mobile menu
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on about page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        initAboutPhotoTilt();
        initModelStepHover();
        refreshIcons();
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function initAboutPhotoTilt() {
        const photoWrap = document.querySelector(".about-intro__photos");

        if (!photoWrap) return;

        const supportsHover = window.matchMedia("(hover: hover)").matches;

        if (!supportsHover) return;

        photoWrap.addEventListener("pointermove", (event) => {
            const rect = photoWrap.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            photoWrap.style.setProperty("--about-photo-x", `${x * 14}px`);
            photoWrap.style.setProperty("--about-photo-y", `${y * 14}px`);
        });

        photoWrap.addEventListener("pointerleave", () => {
            photoWrap.style.setProperty("--about-photo-x", "0px");
            photoWrap.style.setProperty("--about-photo-y", "0px");
        });
    }

    function initModelStepHover() {
        const steps = document.querySelectorAll(".model-step");

        if (!steps.length) return;

        steps.forEach((step) => {
            step.addEventListener("pointerenter", () => {
                steps.forEach((item) => {
                    item.classList.toggle("is-soft", item !== step);
                });
            });

            step.addEventListener("pointerleave", () => {
                steps.forEach((item) => {
                    item.classList.remove("is-soft");
                });
            });
        });
    }
})();