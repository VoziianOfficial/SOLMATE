"use strict";

window.SITE_CONFIG = {
    companyName: "Solmate",
    companyId: "Solmate Provider Matching LLC",

    brand: {
        shortName: "Solmate",
        logoText: "Solmate",
        logoLabel: "Solmate home",
        tagline: "Compare solar provider options with clarity."
    },

    phone: "(877) 555-0199",
    phoneHref: "tel:+18775550199",
    phoneLabel: "Call Solmate at (877) 555-0199",
    phoneButtonText: "(877) 555-0199",

    email: "hello@solmate.com",

    address: {
        line1: "1846 W Solar Ridge Ave",
        city: "Phoenix",
        state: "AZ",
        zip: "85007",
        country: "USA",
        full: "1846 W Solar Ridge Ave, Phoenix, AZ 85007, USA"
    },

    serviceArea: "United States",

    assets: {
        faviconSvg: "./assets/icons/favicon.svg",
        faviconIco: "./assets/icons/favicon.ico",

        images: {
            homeHero: "./assets/images/hero-home.jpg",
            servicesHero: "./assets/images/hero-services.jpg",
            aboutHero: "./assets/images/hero-about.jpg",
            contactHero: "./assets/images/hero-contact.jpg",
            legalHero: "./assets/images/hero-legal.jpg",

            solarRoofWide: "./assets/images/solar-roof-wide.jpg",
            solarPanelsClose: "./assets/images/solar-panels-close.jpg",
            solarHomeEvening: "./assets/images/solar-home-evening.jpg",
            solarBatteryWall: "./assets/images/solar-battery-wall.jpg",
            solarAdvisor: "./assets/images/solar-advisor.jpg",
            solarCta: "./assets/images/solar-cta.jpg"
        }
    },

    navigation: [
        { label: "Home", href: "index.html" },
        { label: "Services", href: "services.html" },
        { label: "About", href: "about.html" },
        { label: "Contact", href: "contact.html" }
    ],

    legalLinks: [
        { label: "Privacy Policy", href: "privacy-policy.html" },
        { label: "Cookie Policy", href: "cookie-policy.html" },
        { label: "Terms of Service", href: "terms-of-service.html" }
    ],

    services: [
        {
            id: "solar-panel-installation",
            title: "Solar Panel Installation",
            shortTitle: "Installation",
            href: "solar-panel-installation.html",
            icon: "sun",
            number: "01",
            image: "./assets/images/service-installation.jpg",
            summary: "Compare provider options for new residential solar panel projects.",
            cardText: "Review providers for new rooftop solar projects, system sizing, panel options, warranties, and project scope.",
            heroTitle: "Solar Panel Installation",
            heroText: "Compare independent provider options for residential solar panel installation requests.",
            pageKicker: "Provider matching for new solar projects",
            pageIntro: "Solmate helps homeowners organize and compare independent solar provider options for new residential solar panel projects. Solmate does not install solar panels directly.",
            evaluationPoints: [
                "System size and roof fit",
                "Panel and inverter options",
                "Warranty and workmanship terms",
                "Estimated project timeline",
                "Financing and payment structure",
                "Provider licensing and insurance"
            ]
        },
        {
            id: "solar-panel-replacement",
            title: "Solar Panel Replacement",
            shortTitle: "Replacement",
            href: "solar-panel-replacement.html",
            icon: "refresh-cw",
            number: "02",
            image: "./assets/images/service-replacement.jpg",
            summary: "Review provider options for replacing or upgrading existing solar panels.",
            cardText: "Compare providers for panel replacement, system upgrades, compatibility checks, removal scope, and warranty terms.",
            heroTitle: "Solar Panel Replacement",
            heroText: "Review independent provider options for replacing or upgrading existing residential solar panels.",
            pageKicker: "Provider matching for solar upgrades",
            pageIntro: "Solmate helps homeowners compare independent provider options for solar panel replacement and upgrade requests. Solmate does not replace solar panels directly.",
            evaluationPoints: [
                "Current system condition",
                "Panel compatibility",
                "Roof condition and access",
                "Removal and replacement scope",
                "Upgrade options",
                "Warranty transfer or renewal"
            ]
        },
        {
            id: "solar-panel-repair",
            title: "Solar Panel Repair",
            shortTitle: "Repair",
            href: "solar-panel-repair.html",
            icon: "wrench",
            number: "03",
            image: "./assets/images/service-repair.jpg",
            summary: "Explore providers who may handle troubleshooting and repair-related solar requests.",
            cardText: "Compare providers for troubleshooting, inverter concerns, monitoring issues, panel damage, and repair-related requests.",
            heroTitle: "Solar Panel Repair",
            heroText: "Explore independent provider options for solar troubleshooting and repair-related requests.",
            pageKicker: "Provider matching for repair requests",
            pageIntro: "Solmate helps homeowners compare independent solar provider options for repair-related solar requests. Solmate does not diagnose, repair, or service systems directly.",
            evaluationPoints: [
                "Troubleshooting scope",
                "Inverter and monitoring issues",
                "Panel damage review",
                "Wiring and connection concerns",
                "Warranty status",
                "Provider response time"
            ]
        },
        {
            id: "solar-battery-storage",
            title: "Solar Battery Storage",
            shortTitle: "Battery Storage",
            href: "solar-battery-storage.html",
            icon: "battery-charging",
            number: "04",
            image: "./assets/images/service-battery.jpg",
            summary: "Compare battery storage provider options for backup power and energy management.",
            cardText: "Review providers for solar battery storage, backup power goals, monitoring tools, compatibility, and warranty terms.",
            heroTitle: "Solar Battery Storage",
            heroText: "Compare independent provider options for residential solar battery storage requests.",
            pageKicker: "Provider matching for battery storage",
            pageIntro: "Solmate helps homeowners compare independent provider options for solar battery storage and backup power requests. Solmate does not install battery systems directly.",
            evaluationPoints: [
                "Battery capacity",
                "Backup duration",
                "Panel and inverter compatibility",
                "Monitoring tools",
                "Warranty coverage",
                "Installation scope"
            ]
        }
    ],

    home: {
        hero: {
            eyebrow: "Premium solar provider matching",
            title: "Solar, Matched.",
            text: "Compare independent solar provider options for installation, replacement, repair, and battery storage with a clearer, warmer way to review your next step.",
            primaryCta: {
                label: "Explore Services",
                href: "services.html"
            },
            secondaryCta: {
                label: "Contact Solmate",
                href: "contact.html#contact-form"
            },
            background: "./assets/images/hero-home.jpg"
        },

        regulator: {
            eyebrow: "Solar mood regulator",
            title: "Tune the warmth of your solar experience.",
            text: "Move from soft cloud cover to bright solar warmth. The interface responds with a subtle accent shift while keeping readability and contrast intact.",
            minLabel: "Clouded",
            maxLabel: "Sunny",
            defaultValue: 68
        },

        process: {
            eyebrow: "How Solmate works",
            title: "A cleaner way to compare solar providers.",
            text: "Solmate organizes provider-matching steps so homeowners can review options without confusing the platform with a direct contractor.",
            steps: [
                {
                    number: "01",
                    title: "Share project details",
                    text: "Tell us the solar service category, location, and general project needs."
                },
                {
                    number: "02",
                    title: "Review provider options",
                    text: "Solmate helps organize relevant independent provider categories and comparison points."
                },
                {
                    number: "03",
                    title: "Compare fit factors",
                    text: "Review quotes, equipment, warranties, timelines, and availability directly with providers."
                },
                {
                    number: "04",
                    title: "Contact providers directly",
                    text: "Homeowners choose which independent providers to contact and what details to verify."
                }
            ]
        },

        editorial: {
            eyebrow: "Solar decisions, organized",
            title: "Warm clarity before a major home energy decision.",
            text: "Solar projects can involve equipment choices, financing terms, roof conditions, warranties, and local provider availability. Solmate keeps the comparison experience focused while reminding homeowners to verify key details directly with each provider.",
            images: [
                {
                    src: "./assets/images/solar-roof-wide.jpg",
                    alt: "Modern home roof with solar panels in warm evening light"
                },
                {
                    src: "./assets/images/solar-panels-close.jpg",
                    alt: "Close-up view of premium solar panel reflections"
                }
            ]
        },

        cta: {
            title: "Ready to compare solar provider options?",
            text: "Explore service categories or start a provider-matching request with Solmate.",
            background: "./assets/images/solar-cta.jpg",
            primaryCta: {
                label: "Compare Services",
                href: "services.html"
            },
            secondaryCta: {
                label: "Contact Solmate",
                href: "contact.html#contact-form"
            }
        }
    },

    servicesPage: {
        hero: {
            eyebrow: "Solar service categories",
            title: "Solar Services",
            text: "Explore four residential solar service categories and compare independent provider options with clarity.",
            background: "./assets/images/hero-services.jpg"
        },

        providerFit: [
            {
                title: "Roof & system fit",
                text: "Compare provider conversations around roof layout, system size, energy goals, and equipment compatibility.",
                icon: "house"
            },
            {
                title: "Quote and warranty details",
                text: "Review pricing structure, warranty coverage, financing terms, and scope details directly with providers.",
                icon: "file-check"
            },
            {
                title: "Provider availability",
                text: "Availability may vary by ZIP code, service type, provider category, and project timing.",
                icon: "map-pin"
            }
        ],

        comparisonFactors: [
            {
                title: "Licensing and insurance",
                text: "Homeowners should verify licensing and insurance directly with each provider.",
                icon: "shield-check"
            },
            {
                title: "Equipment brands",
                text: "Ask providers about panels, inverters, batteries, monitoring tools, and compatibility.",
                icon: "cpu"
            },
            {
                title: "Warranty terms",
                text: "Compare product, performance, workmanship, and battery warranty details.",
                icon: "badge-check"
            },
            {
                title: "Financing options",
                text: "Review loans, leases, cash purchase details, and payment terms carefully.",
                icon: "wallet-cards"
            },
            {
                title: "Project timelines",
                text: "Ask about permitting, inspection, installation windows, and utility interconnection.",
                icon: "calendar-clock"
            },
            {
                title: "Local availability",
                text: "Provider options may differ by city, ZIP code, service type, and schedule.",
                icon: "navigation"
            }
        ]
    },

    aboutPage: {
        hero: {
            eyebrow: "About the platform",
            title: "About Solmate",
            text: "Solmate helps homeowners compare independent solar provider options without positioning itself as a direct installer.",
            background: "./assets/images/hero-about.jpg"
        },

        whatWeDo: {
            eyebrow: "What we do",
            title: "A provider-matching platform for residential solar decisions.",
            text: "Solmate is an independent solar provider-matching aggregator. The platform helps homeowners organize service categories, review provider-fit factors, and connect with independent solar companies. Solmate does not perform solar installation, repair, replacement, or battery installation directly.",
            images: [
                {
                    src: "./assets/images/solar-home-evening.jpg",
                    alt: "Premium residential home with rooftop solar panels"
                },
                {
                    src: "./assets/images/solar-advisor.jpg",
                    alt: "Solar planning conversation in a warm residential setting"
                }
            ]
        },

        model: {
            title: "The Solmate model",
            steps: [
                {
                    title: "Homeowner Request",
                    text: "The homeowner shares the service type, location, and project context."
                },
                {
                    title: "Provider Options",
                    text: "Solmate helps organize relevant provider categories and comparison factors."
                },
                {
                    title: "Direct Provider Review",
                    text: "The homeowner reviews quotes, licensing, insurance, warranties, and details directly with providers."
                }
            ]
        },

        standards: [
            {
                title: "Clarity",
                text: "The platform is built to make comparison steps easier to understand.",
                icon: "sparkles"
            },
            {
                title: "Transparency",
                text: "Solmate clearly states that providers are independent and that homeowners verify details directly.",
                icon: "badge-info"
            },
            {
                title: "Provider comparison",
                text: "Service categories, quote factors, warranties, and project scope stay central.",
                icon: "columns-3"
            },
            {
                title: "Verification reminders",
                text: "Homeowners are reminded to confirm licensing, insurance, pricing, and terms.",
                icon: "clipboard-check"
            },
            {
                title: "No direct installation claims",
                text: "Solmate is not a contractor and does not perform solar work directly.",
                icon: "shield-alert"
            }
        ],

        photoStory: {
            eyebrow: "Why it matters",
            title: "Solar choices deserve a calmer comparison experience.",
            text: "A residential solar project can involve roof conditions, equipment decisions, financing, warranties, utility timelines, and local availability. Solmate helps homeowners approach those conversations with more structure.",
            images: [
                {
                    src: "./assets/images/solar-roof-wide.jpg",
                    alt: "Wide rooftop solar panel view with warm sunlight"
                },
                {
                    src: "./assets/images/solar-panels-close.jpg",
                    alt: "Square close-up of reflective solar panels"
                },
                {
                    src: "./assets/images/solar-battery-wall.jpg",
                    alt: "Vertical view of modern solar battery storage equipment"
                }
            ]
        }
    },

    contactPage: {
        hero: {
            eyebrow: "Start a provider-matching request",
            title: "Contact Solmate",
            text: "Share your solar service category and location so Solmate can help you organize the next comparison step.",
            background: "./assets/images/hero-contact.jpg"
        },

        introItems: [
            {
                label: "Phone",
                value: "(877) 555-0199",
                href: "tel:+18775550199",
                icon: "phone"
            },
            {
                label: "Email",
                value: "hello@solmate.com",
                href: "mailto:hello@solmate.com",
                icon: "mail"
            },
            {
                label: "Address",
                value: "1846 W Solar Ridge Ave, Phoenix, AZ 85007, USA",
                href: null,
                icon: "map-pin"
            },
            {
                label: "Service Area",
                value: "United States",
                href: null,
                icon: "globe-2"
            }
        ],

        nextSteps: [
            {
                number: "01",
                title: "Request received",
                text: "Your request details help organize the service category and project context."
            },
            {
                number: "02",
                title: "Options reviewed",
                text: "Solmate helps frame provider categories and comparison points for your solar request."
            },
            {
                number: "03",
                title: "You compare directly",
                text: "Homeowners verify provider details, quotes, insurance, warranties, and scope directly."
            }
        ]
    },

    serviceDetails: {
        "solar-panel-installation": {
            serviceId: "solar-panel-installation",
            page: "solar-panel-installation.html",
            heroBackground: "./assets/images/service-installation.jpg",
            overviewImage: "./assets/images/solar-home-evening.jpg",
            photoBand: [
                {
                    src: "./assets/images/solar-roof-wide.jpg",
                    alt: "Wide residential rooftop with solar panels"
                },
                {
                    src: "./assets/images/solar-panels-close.jpg",
                    alt: "Vertical solar panel close-up"
                },
                {
                    src: "./assets/images/service-installation.jpg",
                    alt: "Square solar installation planning image"
                }
            ],
            compareCards: [
                { title: "System size", text: "Compare how providers estimate system size based on home energy goals.", icon: "ruler" },
                { title: "Panel type", text: "Ask about panel options, efficiency, durability, and appearance.", icon: "grid-3x3" },
                { title: "Inverter options", text: "Review inverter choices, monitoring features, and compatibility.", icon: "plug-zap" },
                { title: "Warranty", text: "Compare product, performance, and workmanship warranty terms.", icon: "badge-check" },
                { title: "Timeline", text: "Ask about permitting, inspection, installation, and utility approval timing.", icon: "calendar-clock" },
                { title: "Financing", text: "Review payment options, loan terms, leases, and ownership details.", icon: "wallet-cards" }
            ]
        },

        "solar-panel-replacement": {
            serviceId: "solar-panel-replacement",
            page: "solar-panel-replacement.html",
            heroBackground: "./assets/images/service-replacement.jpg",
            overviewImage: "./assets/images/solar-panels-close.jpg",
            photoBand: [
                {
                    src: "./assets/images/service-replacement.jpg",
                    alt: "Residential solar panel replacement planning"
                },
                {
                    src: "./assets/images/solar-roof-wide.jpg",
                    alt: "Vertical rooftop solar panel view"
                },
                {
                    src: "./assets/images/solar-home-evening.jpg",
                    alt: "Square modern home with solar panels"
                }
            ],
            compareCards: [
                { title: "System condition", text: "Review how providers evaluate the current system and replacement needs.", icon: "activity" },
                { title: "Compatibility", text: "Ask whether new panels work with existing inverters and monitoring tools.", icon: "cable" },
                { title: "Roof condition", text: "Compare how providers account for roof age, access, and mounting conditions.", icon: "house" },
                { title: "Warranty terms", text: "Review whether product or workmanship coverage changes after replacement.", icon: "shield-check" },
                { title: "Removal scope", text: "Ask what removal, disposal, and reconnection work may be included.", icon: "package-x" },
                { title: "Upgrade options", text: "Compare whether replacement may include efficiency or storage upgrades.", icon: "trending-up" }
            ]
        },

        "solar-panel-repair": {
            serviceId: "solar-panel-repair",
            page: "solar-panel-repair.html",
            heroBackground: "./assets/images/service-repair.jpg",
            overviewImage: "./assets/images/solar-roof-wide.jpg",
            photoBand: [
                {
                    src: "./assets/images/service-repair.jpg",
                    alt: "Solar repair provider review"
                },
                {
                    src: "./assets/images/solar-panels-close.jpg",
                    alt: "Vertical panel inspection detail"
                },
                {
                    src: "./assets/images/solar-home-evening.jpg",
                    alt: "Square residential solar home image"
                }
            ],
            compareCards: [
                { title: "Troubleshooting", text: "Ask providers how they evaluate production, error codes, or performance concerns.", icon: "search-check" },
                { title: "Inverter issues", text: "Compare provider experience with inverter faults and monitoring alerts.", icon: "cpu" },
                { title: "Panel damage", text: "Review how providers assess cracked panels, debris damage, or weather impact.", icon: "panel-top" },
                { title: "Wiring checks", text: "Ask about wiring, connectors, grounding, and safety-related review scope.", icon: "cable" },
                { title: "Warranty status", text: "Confirm whether the issue may be covered under product or workmanship warranty.", icon: "file-check" },
                { title: "Response time", text: "Compare availability, scheduling windows, and local service coverage.", icon: "clock-3" }
            ]
        },

        "solar-battery-storage": {
            serviceId: "solar-battery-storage",
            page: "solar-battery-storage.html",
            heroBackground: "./assets/images/service-battery.jpg",
            overviewImage: "./assets/images/solar-battery-wall.jpg",
            photoBand: [
                {
                    src: "./assets/images/service-battery.jpg",
                    alt: "Residential solar battery storage setup"
                },
                {
                    src: "./assets/images/solar-battery-wall.jpg",
                    alt: "Vertical modern home battery storage equipment"
                },
                {
                    src: "./assets/images/solar-home-evening.jpg",
                    alt: "Square solar home with warm evening light"
                }
            ],
            compareCards: [
                { title: "Battery capacity", text: "Compare storage capacity, usable energy, and household backup goals.", icon: "battery-charging" },
                { title: "Backup duration", text: "Ask how long selected circuits or whole-home systems may be supported.", icon: "timer" },
                { title: "Compatibility", text: "Review whether the battery works with existing panels, inverters, and monitoring.", icon: "plug-zap" },
                { title: "Monitoring tools", text: "Compare app controls, usage insights, and energy management features.", icon: "line-chart" },
                { title: "Warranty", text: "Ask about battery warranty length, cycles, capacity retention, and exclusions.", icon: "badge-check" },
                { title: "Install scope", text: "Review electrical work, permits, placement, inspection, and utility coordination.", icon: "clipboard-list" }
            ]
        }
    },

    sharedProcess: [
        {
            number: "01",
            title: "Share project details",
            text: "Provide the solar service category, location, and general project context."
        },
        {
            number: "02",
            title: "Review matching provider options",
            text: "Solmate helps organize provider categories and comparison points for the request."
        },
        {
            number: "03",
            title: "Compare quote and scope factors",
            text: "Review pricing, equipment, warranty, availability, and project scope directly with providers."
        },
        {
            number: "04",
            title: "Contact providers directly",
            text: "Homeowners decide which independent providers to contact and what details to verify."
        }
    ],

    testimonials: [
        {
            text: "Solmate made the solar comparison process feel less scattered. I knew what to ask providers before moving forward.",
            name: "Maya",
            location: "Scottsdale, AZ",
            rating: "5.0",
            icon: "user-round-check"
        },
        {
            text: "The platform helped me organize installation, battery, and warranty questions before speaking with local companies.",
            name: "Daniel",
            location: "Austin, TX",
            rating: "5.0",
            icon: "user-round"
        },
        {
            text: "I liked that Solmate was clear about being a matching platform, not the installer. That made the process easier to understand.",
            name: "Claire",
            location: "Tampa, FL",
            rating: "4.9",
            icon: "user-check"
        },
        {
            text: "The service categories were simple, and the provider comparison reminders were useful before reviewing quotes.",
            name: "Evan",
            location: "San Diego, CA",
            rating: "5.0",
            icon: "user-round-cog"
        }
    ],

    faqs: {
        home: [
            {
                question: "Does Solmate install solar panels directly?",
                answer: "No. Solmate is an independent provider-matching platform. It does not perform solar installation, repair, replacement, or battery installation directly."
            },
            {
                question: "Are providers independent?",
                answer: "Yes. Providers are independent companies. Homeowners should verify licensing, insurance, quotes, warranties, timelines, and service details directly with providers."
            },
            {
                question: "What should homeowners verify before choosing a solar provider?",
                answer: "Homeowners should verify licensing, insurance, equipment details, warranty terms, financing terms, project scope, timeline, and local availability directly with each provider."
            },
            {
                question: "Can provider availability vary by ZIP code?",
                answer: "Yes. Provider availability may vary by location, ZIP code, service type, provider category, and schedule."
            }
        ],

        services: [
            {
                question: "How do I compare local solar providers?",
                answer: "Compare licensing, insurance, equipment options, warranty terms, financing structure, project timelines, and local availability directly with each provider."
            },
            {
                question: "What affects solar project pricing?",
                answer: "Pricing can be affected by system size, roof conditions, equipment selection, battery storage needs, permitting, utility requirements, financing terms, and provider scope."
            },
            {
                question: "Are quotes from providers usually free?",
                answer: "Some providers may offer free quotes, while others may have different evaluation processes. Homeowners should confirm quote terms directly with each provider."
            },
            {
                question: "Does Solmate guarantee provider availability?",
                answer: "No. Solmate does not guarantee provider availability, pricing, timelines, or project outcomes."
            }
        ],

        about: [
            {
                question: "What is Solmate?",
                answer: "Solmate is an independent solar provider-matching aggregator platform that helps homeowners compare solar provider options."
            },
            {
                question: "Is Solmate a solar contractor?",
                answer: "No. Solmate is not a contractor and does not perform solar work directly."
            },
            {
                question: "Why does Solmate focus on comparison?",
                answer: "Solar decisions can involve equipment, warranties, financing, roof conditions, utility timing, and provider availability. Solmate helps organize those comparison points."
            },
            {
                question: "What should I confirm with providers?",
                answer: "Confirm licensing, insurance, quote details, warranties, project timeline, equipment, financing terms, service area, and scope directly with providers."
            }
        ],

        contact: [
            {
                question: "What happens after I submit a request?",
                answer: "Solmate receives your request details and helps organize the relevant service category and provider comparison context."
            },
            {
                question: "Will Solmate perform the solar work?",
                answer: "No. Solmate does not perform solar installation, repair, replacement, or battery installation directly."
            },
            {
                question: "Can I choose which providers to contact?",
                answer: "Yes. Homeowners decide which independent providers to contact and what project details to verify."
            },
            {
                question: "Do I need to verify provider details myself?",
                answer: "Yes. Homeowners should verify licensing, insurance, quotes, warranties, timelines, and scope directly with providers."
            }
        ],

        "solar-panel-installation": [
            {
                question: "Does Solmate install solar panel systems?",
                answer: "No. Solmate helps homeowners compare independent provider options but does not install solar panels directly."
            },
            {
                question: "What should I compare for solar installation?",
                answer: "Compare system size, panel type, inverter options, warranty terms, financing structure, installation timeline, and provider credentials."
            },
            {
                question: "Can installation availability vary by location?",
                answer: "Yes. Provider availability may vary by ZIP code, service category, project scope, and schedule."
            },
            {
                question: "Should I verify licensing and insurance?",
                answer: "Yes. Homeowners should verify licensing, insurance, permits, quote details, warranties, and project terms directly with providers."
            }
        ],

        "solar-panel-replacement": [
            {
                question: "Does Solmate replace solar panels directly?",
                answer: "No. Solmate is a provider-matching platform and does not replace solar panels directly."
            },
            {
                question: "What should I compare for solar panel replacement?",
                answer: "Compare current system condition, panel compatibility, roof condition, removal scope, warranty terms, and upgrade options."
            },
            {
                question: "Can replacement affect existing warranties?",
                answer: "It may. Homeowners should ask providers how replacement work may affect product, performance, or workmanship warranty terms."
            },
            {
                question: "Can provider options vary?",
                answer: "Yes. Provider availability may vary by location, system type, service category, and schedule."
            }
        ],

        "solar-panel-repair": [
            {
                question: "Does Solmate repair solar systems?",
                answer: "No. Solmate does not diagnose, repair, or service solar systems directly."
            },
            {
                question: "What repair factors should I compare?",
                answer: "Compare troubleshooting scope, inverter concerns, monitoring issues, wiring checks, panel damage review, warranty status, and response time."
            },
            {
                question: "Should I check warranty coverage first?",
                answer: "Yes. Homeowners should confirm whether the issue may be covered by product, performance, or workmanship warranty terms."
            },
            {
                question: "Are repair providers independent?",
                answer: "Yes. Providers are independent, and homeowners should verify licensing, insurance, quotes, warranties, and service details directly."
            }
        ],

        "solar-battery-storage": [
            {
                question: "Does Solmate install solar batteries?",
                answer: "No. Solmate does not install battery systems directly. It helps homeowners compare independent provider options."
            },
            {
                question: "What should I compare for battery storage?",
                answer: "Compare battery capacity, backup duration, panel compatibility, monitoring tools, warranty terms, placement, permitting, and installation scope."
            },
            {
                question: "Can batteries work with existing solar panels?",
                answer: "Compatibility depends on the existing system, inverter setup, battery model, and provider scope. Homeowners should confirm details directly with providers."
            },
            {
                question: "Can provider availability vary for battery storage?",
                answer: "Yes. Availability may vary by ZIP code, service category, equipment type, and provider schedule."
            }
        ]
    },

    forms: {
        contactTitle: "Start a solar provider matching request",
        contactIntro: "Share a few details so Solmate can help organize the right solar service category and comparison context.",
        successMessage: "Thank you. Your request has been received.",
        errorMessage: "Please complete the required fields before submitting.",
        submitLabel: "Submit Request",
        fields: {
            fullName: {
                label: "Full name",
                placeholder: "Your full name",
                requiredMessage: "Please enter your full name."
            },
            phone: {
                label: "Phone number",
                placeholder: "(555) 000-0000",
                requiredMessage: "Please enter your phone number."
            },
            email: {
                label: "Email address",
                placeholder: "you@example.com",
                requiredMessage: "Please enter a valid email address."
            },
            service: {
                label: "Service category",
                placeholder: "Select a service",
                requiredMessage: "Please select a service category."
            },
            message: {
                label: "Project message",
                placeholder: "Tell us what you would like to compare.",
                requiredMessage: "Please enter a short project message."
            }
        }
    },

    cookieBanner: {
        storageKey: "solmate_cookie_choice",
        title: "Privacy preferences",
        text: "Solmate uses cookies and similar technologies to improve site functionality and understand usage. Review our policies before making a choice.",
        accept: "Accept",
        decline: "Decline",
        links: [
            { label: "Privacy Policy", href: "privacy-policy.html" },
            { label: "Cookie Policy", href: "cookie-policy.html" },
            { label: "Terms of Service", href: "terms-of-service.html" }
        ]
    },

    disclaimer: "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice: "Solmate is an independent provider-matching platform. It does not perform solar installation, repair, replacement, or battery installation directly. Providers are independent, and homeowners should verify all licensing, insurance, pricing, warranties, and project details directly with providers.",

    footerText: "Solmate helps homeowners compare independent solar provider options across the United States.",

    footerColumns: [
        {
            title: "Company",
            links: [
                { label: "Home", href: "index.html" },
                { label: "Services", href: "services.html" },
                { label: "About", href: "about.html" },
                { label: "Contact", href: "contact.html" }
            ]
        },
        {
            title: "Services",
            links: [
                { label: "Solar Panel Installation", href: "solar-panel-installation.html" },
                { label: "Solar Panel Replacement", href: "solar-panel-replacement.html" },
                { label: "Solar Panel Repair", href: "solar-panel-repair.html" },
                { label: "Solar Battery Storage", href: "solar-battery-storage.html" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "privacy-policy.html" },
                { label: "Cookie Policy", href: "cookie-policy.html" },
                { label: "Terms of Service", href: "terms-of-service.html" }
            ]
        }
    ],

    legalPages: {
        "privacy-policy.html": {
            title: "Privacy Policy",
            eyebrow: "Legal",
            intro: "This Privacy Policy explains how Solmate may collect, use, and protect information submitted through this provider-matching website.",
            effectiveDate: "Effective date: May 13, 2026",
            sections: [
                {
                    title: "Information we may collect",
                    text: "Solmate may collect information submitted through forms, including name, phone number, email address, service category, location details, and project messages."
                },
                {
                    title: "How information may be used",
                    text: "Information may be used to respond to requests, organize solar provider-matching context, improve site functionality, and communicate about requested services."
                },
                {
                    title: "Independent providers",
                    text: "Providers are independent companies. If homeowner information is shared with or submitted to a provider, that provider may have its own privacy practices."
                },
                {
                    title: "Cookies and usage data",
                    text: "Solmate may use cookies and similar technologies to understand site usage and improve functionality. Users can review cookie details in the Cookie Policy."
                },
                {
                    title: "Contact",
                    text: "Questions about this Privacy Policy may be sent to hello@solmate.com."
                }
            ]
        },

        "cookie-policy.html": {
            title: "Cookie Policy",
            eyebrow: "Legal",
            intro: "This Cookie Policy explains how Solmate may use cookies and similar technologies on this website.",
            effectiveDate: "Effective date: May 13, 2026",
            sections: [
                {
                    title: "What cookies are",
                    text: "Cookies are small files stored on a device that help websites remember preferences, understand usage, and support basic functionality."
                },
                {
                    title: "How Solmate may use cookies",
                    text: "Solmate may use cookies for site functionality, privacy preference storage, performance understanding, and general usage insights."
                },
                {
                    title: "Privacy preference storage",
                    text: "When a user accepts or declines the cookie banner, that choice may be stored locally in the browser so the banner does not reappear unnecessarily."
                },
                {
                    title: "Managing cookies",
                    text: "Users can manage or delete cookies through their browser settings. Blocking cookies may affect certain site functionality."
                },
                {
                    title: "Contact",
                    text: "Questions about this Cookie Policy may be sent to hello@solmate.com."
                }
            ]
        },

        "terms-of-service.html": {
            title: "Terms of Service",
            eyebrow: "Legal",
            intro: "These Terms of Service describe general terms for using the Solmate provider-matching website.",
            effectiveDate: "Effective date: May 13, 2026",
            sections: [
                {
                    title: "Platform role",
                    text: "Solmate is an independent provider-matching platform. Solmate does not perform solar installation, repair, replacement, battery installation, or related solar work directly."
                },
                {
                    title: "Independent providers",
                    text: "Providers are independent. Solmate does not control provider pricing, availability, quotes, warranties, timelines, insurance, licensing, or work quality."
                },
                {
                    title: "Homeowner responsibility",
                    text: "Homeowners are responsible for verifying licensing, insurance, pricing, warranties, project scope, permits, financing terms, and service details directly with providers."
                },
                {
                    title: "No guarantees",
                    text: "Solmate does not guarantee provider availability, project results, pricing, savings, installation outcomes, repair outcomes, or battery storage performance."
                },
                {
                    title: "Contact",
                    text: "Questions about these Terms of Service may be sent to hello@solmate.com."
                }
            ]
        }
    },

    pageMeta: {
        "index.html": {
            title: "Solmate | Compare Solar Provider Options",
            description: "Compare independent solar provider options for installation, replacement, repair, and battery storage."
        },
        "services.html": {
            title: "Solar Services | Solmate",
            description: "Explore solar service categories and compare independent provider options with Solmate."
        },
        "about.html": {
            title: "About Solmate | Solar Provider Matching Platform",
            description: "Learn how Solmate helps homeowners compare independent solar provider options."
        },
        "contact.html": {
            title: "Contact Solmate | Start a Provider Matching Request",
            description: "Contact Solmate to start a solar provider matching request."
        },
        "solar-panel-installation.html": {
            title: "Solar Panel Installation Provider Matching | Solmate",
            description: "Compare independent solar panel installation provider options with Solmate."
        },
        "solar-panel-replacement.html": {
            title: "Solar Panel Replacement Provider Matching | Solmate",
            description: "Review independent solar panel replacement provider options with Solmate."
        },
        "solar-panel-repair.html": {
            title: "Solar Panel Repair Provider Matching | Solmate",
            description: "Explore independent provider options for solar panel repair-related requests."
        },
        "solar-battery-storage.html": {
            title: "Solar Battery Storage Provider Matching | Solmate",
            description: "Compare independent solar battery storage provider options for backup power and energy management."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Solmate",
            description: "Review the Solmate Privacy Policy for this solar provider-matching website."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Solmate",
            description: "Review the Solmate Cookie Policy for cookies and privacy preference storage."
        },
        "terms-of-service.html": {
            title: "Terms of Service | Solmate",
            description: "Review the Solmate Terms of Service for this provider-matching website."
        }
    }
};