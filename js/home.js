"use strict";

/* ==========================================================
   Solmate — Home Page Script
   Handles:
   - interactive solar mood regulator
   - premium testimonial slider without customer photos
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on home page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        renderTestimonials();
        initSolarRegulator();
        initTestimonialSlider();
        refreshIcons();
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
       Solar Mood Regulator
       ========================================================== */

    function initSolarRegulator() {
        const regulator = document.querySelector("[data-solar-regulator]");
        const range = document.querySelector("[data-solar-range]");
        const valueText = document.querySelector("[data-solar-value]");

        if (!regulator || !range) return;

        const root = document.documentElement;
        const defaultValue = Number(config.home?.regulator?.defaultValue || 68);

        range.value = String(defaultValue);
        updateSolarMood(defaultValue);

        range.addEventListener("input", () => {
            updateSolarMood(Number(range.value));
        });

        function updateSolarMood(value) {
            const clampedValue = Math.max(0, Math.min(100, value));
            const intensity = clampedValue / 100;

            const orange = interpolateColor("#d86927", "#ff8a32", intensity);
            const orangeHover = interpolateColor("#e17a35", "#ffc164", intensity);
            const orangeDeep = interpolateColor("#a74f20", "#c75a12", intensity);
            const gold = interpolateColor("#bd8b4b", "#f1c879", intensity);

            root.style.setProperty("--color-accent", orange);
            root.style.setProperty("--color-accent-hover", orangeHover);
            root.style.setProperty("--color-accent-deep", orangeDeep);
            root.style.setProperty("--color-gold-light", gold);

            regulator.style.setProperty("--solar-progress", clampedValue);
            regulator.style.setProperty("--solar-x", `${24 + intensity * 58}%`);
            regulator.style.setProperty("--solar-glow", String(0.1 + intensity * 0.18));
            regulator.style.setProperty("--solar-visual", String(0.12 + intensity * 0.22));
            regulator.style.setProperty("--solar-sky", String(0.12 + intensity * 0.28));
            regulator.style.setProperty("--solar-power", `${Math.round(8 + intensity * 30)}px`);
            regulator.style.setProperty("--solar-shadow", String(0.12 + intensity * 0.24));
            regulator.style.setProperty("--cloud-opacity", String(0.28 - intensity * 0.14));
            regulator.style.setProperty("--cloud-total-opacity", String(0.88 - intensity * 0.48));

            if (valueText) {
                valueText.textContent = `${Math.round(clampedValue)}% solar warmth`;
            }
        }
    }

    function interpolateColor(startHex, endHex, amount) {
        const start = hexToRgb(startHex);
        const end = hexToRgb(endHex);

        const r = Math.round(start.r + (end.r - start.r) * amount);
        const g = Math.round(start.g + (end.g - start.g) * amount);
        const b = Math.round(start.b + (end.b - start.b) * amount);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function hexToRgb(hex) {
        const cleanHex = hex.replace("#", "");
        const bigint = parseInt(cleanHex, 16);

        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    /* ==========================================================
       Testimonials render
       ========================================================== */

    function renderTestimonials() {
        const track = document.querySelector("[data-testimonial-track]");

        if (!track || !Array.isArray(config.testimonials)) return;

        track.innerHTML = config.testimonials
            .map((testimonial) => {
                return `
          <article class="testimonial-card">
            <div>
              <div class="testimonial-card__top">
                <span class="testimonial-card__icon" aria-hidden="true">
                  <i data-lucide="${escapeAttribute(testimonial.icon || "user-round")}"></i>
                </span>

                <span class="testimonial-card__rating" aria-label="${escapeAttribute(testimonial.rating)} out of 5 rating">
                  <i data-lucide="star" aria-hidden="true"></i>
                  ${escapeHtml(testimonial.rating)}
                </span>
              </div>

              <blockquote>
                “${escapeHtml(testimonial.text)}”
              </blockquote>
            </div>

            <footer class="testimonial-card__author">
              <strong>${escapeHtml(testimonial.name)}</strong>
              <span>${escapeHtml(testimonial.location)}</span>
            </footer>
          </article>
        `;
            })
            .join("");

        refreshIcons();
    }

    /* ==========================================================
       Testimonials slider
       ========================================================== */

    function initTestimonialSlider() {
        const slider = document.querySelector("[data-testimonial-slider]");
        const track = document.querySelector("[data-testimonial-track]");
        const prevButton = document.querySelector("[data-testimonial-prev]");
        const nextButton = document.querySelector("[data-testimonial-next]");
        const pagination = document.querySelector("[data-testimonial-pagination]");

        if (!slider || !track) return;

        let cards = Array.from(track.querySelectorAll(".testimonial-card"));
        let currentIndex = 0;
        let visibleCount = getVisibleCount();
        let maxIndex = Math.max(0, cards.length - visibleCount);
        let autoplayTimer = null;
        let isPointerInside = false;

        if (!cards.length) return;

        buildPagination();
        updateSlider();

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                goToPrevious();
                restartAutoplay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                goToNext();
                restartAutoplay();
            });
        }

        if (pagination) {
            pagination.addEventListener("click", (event) => {
                const target = event.target;

                if (!(target instanceof HTMLElement)) return;

                const dot = target.closest("[data-testimonial-dot]");

                if (!dot) return;

                const index = Number(dot.getAttribute("data-testimonial-dot"));

                if (Number.isNaN(index)) return;

                currentIndex = Math.min(index, maxIndex);
                updateSlider();
                restartAutoplay();
            });
        }

        slider.addEventListener("mouseenter", () => {
            isPointerInside = true;
            stopAutoplay();
        });

        slider.addEventListener("mouseleave", () => {
            isPointerInside = false;
            startAutoplay();
        });

        slider.addEventListener("focusin", () => {
            stopAutoplay();
        });

        slider.addEventListener("focusout", () => {
            if (!isPointerInside) {
                startAutoplay();
            }
        });

        track.addEventListener("touchstart", stopAutoplay, { passive: true });
        track.addEventListener("touchend", startAutoplay, { passive: true });

        window.addEventListener(
            "resize",
            debounce(() => {
                visibleCount = getVisibleCount();
                maxIndex = Math.max(0, cards.length - visibleCount);
                currentIndex = Math.min(currentIndex, maxIndex);
                buildPagination();
                updateSlider();
            }, 160)
        );

        startAutoplay();

        function getVisibleCount() {
            const width = window.innerWidth;

            if (width <= 820) return 1;
            if (width <= 1180) return 2;

            return 3;
        }

        function goToNext() {
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }

            updateSlider();
        }

        function goToPrevious() {
            if (currentIndex <= 0) {
                currentIndex = maxIndex;
            } else {
                currentIndex -= 1;
            }

            updateSlider();
        }

        function updateSlider() {
            cards = Array.from(track.querySelectorAll(".testimonial-card"));

            if (!cards.length) return;

            const firstCard = cards[0];
            const cardWidth = firstCard.getBoundingClientRect().width;
            const gap = getTrackGap();
            const offset = currentIndex * (cardWidth + gap);

            track.style.transform = `translate3d(-${offset}px, 0, 0)`;

            updatePagination();
            updateButtons();
        }

        function getTrackGap() {
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || "0");

            return Number.isNaN(gap) ? 0 : gap;
        }

        function buildPagination() {
            if (!pagination) return;

            const dotCount = maxIndex + 1;

            pagination.innerHTML = Array.from({ length: dotCount })
                .map((_, index) => {
                    const label = `Go to testimonial group ${index + 1}`;

                    return `
            <button
              class="testimonial-slider__dot"
              type="button"
              aria-label="${label}"
              data-testimonial-dot="${index}"
            ></button>
          `;
                })
                .join("");

            updatePagination();
        }

        function updatePagination() {
            if (!pagination) return;

            pagination.querySelectorAll("[data-testimonial-dot]").forEach((dot) => {
                const dotIndex = Number(dot.getAttribute("data-testimonial-dot"));
                const isActive = dotIndex === currentIndex;

                dot.classList.toggle("is-active", isActive);
                dot.setAttribute("aria-current", isActive ? "true" : "false");
            });
        }

        function updateButtons() {
            if (prevButton) {
                prevButton.disabled = cards.length <= visibleCount;
                prevButton.setAttribute("aria-disabled", String(cards.length <= visibleCount));
            }

            if (nextButton) {
                nextButton.disabled = cards.length <= visibleCount;
                nextButton.setAttribute("aria-disabled", String(cards.length <= visibleCount));
            }
        }

        function startAutoplay() {
            stopAutoplay();

            if (cards.length <= visibleCount) return;

            autoplayTimer = window.setInterval(() => {
                goToNext();
            }, 5200);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                window.clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }
    }

    function debounce(callback, wait) {
        let timeoutId;

        return function debouncedFunction() {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(callback, wait);
        };
    }
})();