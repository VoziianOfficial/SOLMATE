"use strict";









(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on legal page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initLegalPage);

    function initLegalPage() {
        const legalPage = getCurrentLegalPage();

        if (!legalPage) {
            console.error("No legal page config found for this page.");
            return;
        }

        injectLegalHero(legalPage);
        injectLegalDocument(legalPage);
        markActiveLegalLink();
        refreshIcons();
    }

    function getCurrentPage() {
        const path = window.location.pathname.split("/").pop();
        return path || "index.html";
    }

    function getCurrentLegalPage() {
        const page = getCurrentPage();

        if (!config.legalPages || !config.legalPages[page]) {
            return null;
        }

        return config.legalPages[page];
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
       Legal hero
       ========================================================== */

    function injectLegalHero(pageData) {
        const eyebrow = document.querySelector("[data-legal-hero-eyebrow]");
        const title = document.querySelector("[data-legal-hero-title]");
        const text = document.querySelector("[data-legal-hero-text]");

        if (eyebrow) {
            eyebrow.textContent = pageData.eyebrow || "Legal";
        }

        if (title) {
            title.textContent = pageData.title || "Legal";
        }

        if (text) {
            text.textContent = pageData.intro || "";
        }
    }

    /* ==========================================================
       Legal document
       ========================================================== */

    function injectLegalDocument(pageData) {
        const title = document.querySelector("[data-legal-title]");
        const eyebrow = document.querySelector("[data-legal-eyebrow]");
        const intro = document.querySelector("[data-legal-intro]");
        const date = document.querySelector("[data-legal-date]");
        const sectionsMount = document.querySelector("[data-legal-sections]");

        if (title) {
            title.textContent = pageData.title || "Legal";
        }

        if (eyebrow) {
            eyebrow.textContent = pageData.eyebrow || "Legal";
        }

        if (intro) {
            intro.textContent = pageData.intro || "";
        }

        if (date) {
            date.textContent = pageData.effectiveDate || "";
        }

        if (sectionsMount && Array.isArray(pageData.sections)) {
            sectionsMount.innerHTML = pageData.sections
                .map((section) => {
                    return `
            <section class="legal-policy-block">
              <h3>${escapeHtml(section.title)}</h3>
              <p>${escapeHtml(section.text)}</p>
            </section>
          `;
                })
                .join("");
        }

        injectLegalContactNote();
    }

    function injectLegalContactNote() {
        const mount = document.querySelector("[data-legal-contact-note]");

        if (!mount) return;

        mount.innerHTML = `
      <section class="legal-contact-note" aria-labelledby="legalContactTitle">
        <div class="legal-contact-note__top">
          <h2 id="legalContactTitle">Legal contact information</h2>
          <span>Solmate details</span>
        </div>

        <div class="legal-contact-grid">
          <article class="legal-contact-item">
            <span>Phone</span>
            <a href="${escapeAttribute(config.phoneHref)}" data-phone-link>${escapeHtml(config.phone)}</a>
          </article>

          <article class="legal-contact-item">
            <span>Email</span>
            <a href="mailto:${escapeAttribute(config.email)}" data-email-link>${escapeHtml(config.email)}</a>
          </article>

          <article class="legal-contact-item">
            <span>Company ID</span>
            <strong data-company-id>${escapeHtml(config.companyId)}</strong>
          </article>

          <article class="legal-contact-item">
            <span>Address</span>
            <p data-address-text>${escapeHtml(config.address.full)}</p>
          </article>
        </div>
      </section>
    `;
    }

    /* ==========================================================
       Active sidebar
       ========================================================== */

    function markActiveLegalLink() {
        const page = getCurrentPage();

        document.querySelectorAll("[data-legal-link]").forEach((link) => {
            const href = link.getAttribute("href");
            const isActive = href === page;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }
})();