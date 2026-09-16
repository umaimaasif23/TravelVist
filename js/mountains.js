/* ==========================================================================
   MOUNTAIN DESTINATIONS - MAIN JS
   ========================================================================== */

// 1. Mock Data Source (Future API Replacement)
const mockMountainData = [
    {
        id: "trek-k2-01",
        title: "K2 Base Camp",
        subtitle: "Savage Mountain Expedition",
        region: "gilgit",
        difficulty: "extreme",
        elevation: "8,611 Meters",
        elevationVal: 8611,
        durationDays: 14,
        basePrice: 2500,
        image: "./images/gilgit.webp",
        description: "The Savage Mountain — an unforgettable trek across the Baltoro Glacier."
    },
    {
        id: "trek-rp-02",
        title: "Rakaposhi Base Camp",
        subtitle: "Shining Wall Trail",
        region: "hunza",
        difficulty: "moderate",
        elevation: "7,788 Meters",
        elevationVal: 7788,
        durationDays: 7,
        basePrice: 1200,
        image: "./images/hunza.jpg",
        description: "Stunning views of Rakaposhi wall with lush green alpine meadows."
    },
    {
        id: "trek-ds-03",
        title: "Deosai National Park",
        subtitle: "Land of Giants",
        region: "skardu",
        difficulty: "easy",
        elevation: "4,114 Meters",
        elevationVal: 4114,
        durationDays: 4,
        basePrice: 800,
        image: "./images/skardu.jpg",
        description: "The land of giants — rolling green plains filled with wildflowers."
    },
    
    // --- 🌐 International Destinations ---
    {
        title: "Dolomites High Trail",
        region: "Tyrol, Italy",
        elevation: "3,343m",
        difficulty: "moderate",
        description: "Trek through dramatic jagged limestone peaks, vibrant meadows, and iconic alpine huts.",
        image: "./images/itlay.jfif",
        basePrice: 980
    },
    {
        title: "Banff Alpine Circuit",
        region: "Alberta, Canada",
        elevation: "2,987m",
        difficulty: "moderate",
        description: "Discover pristine glacier-fed turquoise lakes surrounded by soaring Canadian Rocky peaks.",
        image: "./images/canada.jfif",
        basePrice: 1100
    },
    {
        title: "Lofoten Ridge Trek",
        region: "Nordland, Norway",
        elevation: "1,054m",
        difficulty: "hard",
        description: "Experience breathtaking vertical coastal mountains rising straight from Arctic fjords.",
        image:"./images/norway.jfif" ,
        basePrice: 890
    }

];
  
let activeTrekPrice = 1500; // Modal calculation variable

/* ==========================================================================
   2. Core Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initHeroEffects();
    renderMountainCards(mockMountainData);
    initFilterAndSearchSystem();
    initBookingModalSystem();
     initItineraryAccordion();
    initProBudgetCalculator();
    initBookingModalController();
    initFooterNewsletter(); // Footer functionality trigger
});


/* ==========================================================================
   3. Hero Animations & Greeting
   ========================================================================== */
function initHeroEffects() {
    const heroSpan = document.querySelector(".mountains-hero-content span");
    const heroTitle = document.querySelector(".mountains-hero-content h1");
    const heroVideo = document.querySelector(".hero-video-bg");

    // Dynamic Time Greeting
    if (heroSpan) {
        const hour = new Date().getHours();
        if (hour < 12) heroSpan.textContent = "MORNING ADVENTURE | EXPLORE";
        else if (hour < 18) heroSpan.textContent = "AFTERNOON ESCAPE | EXPLORE";
        else heroSpan.textContent = "NIGHT TREK & STARS | EXPLORE";
    }

    // Typing Effect
    if (heroTitle) {
        const text = "Discover Mountain Destinations";
        heroTitle.textContent = "";
        let index = 0;
        const type = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 65);
            }
        };
        type();
    }

    // Video Parallax Scroll Effect
    if (heroVideo) {
        window.addEventListener("scroll", () => {
            const scrollPos = window.scrollY;
            if (scrollPos < 600) {
                heroVideo.style.transform = `translateY(${scrollPos * 0.25}px)`;
            }
        });
    }
}

  /* ==========================================================================
   4. Render Cards Dynamic UI
   ========================================================================== */
function renderMountainCards(treks) {
    const container = document.getElementById("mountainsGrid");
    if (!container) return;

    if (treks.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4 class="text-light">No mountain destinations found</h4>
                <p class="text-muted">Try adjusting your search query or filters.</p>
            </div>
        `;
        return;
    }

    // 1. Pehle Cards HTML mein inject honge
    container.innerHTML = treks.map(item => `
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
            
            <!-- Dynamic Uiverse Animated Card -->
            <div class="uiverse-card w-100">
                
                <!-- Glowing Animated Blob -->
                <div class="blob"></div>

                <!-- Glassmorphism Card Inner Content -->
                <div class="bg p-3 d-flex flex-column justify-content-between">
                    <div>
                        <!-- Image Container -->
                        <div class="card-img-wrapper mb-3 rounded overflow-hidden">
                            <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-100" style="height: 180px; object-fit: cover;">
                            <span class="badge-difficulty ${item.difficulty}">${item.difficulty.toUpperCase()}</span>
                        </div>
                        
                        <!-- Details -->
                        <div class="text-start">
                            <span class="text-info small fw-bold d-block mb-1">📍 ${item.region ? item.region.toUpperCase() : 'LOCATION'} • ${item.elevation || ''}</span>
                            <h3 class="h5 text-light fw-bold mb-2">${item.title}</h3>
                            <p class="text-muted small mb-3" style="line-height: 1.4;">${item.description}</p>
                        </div>
                    </div>

                    <!-- Booking Button -->
                    <div class="pt-2">
                        <button 
                            class="btn btn-outline-info w-100 trek-btn fw-semibold"
                            data-bs-toggle="modal" 
                            data-bs-target="#trekModal"
                            data-title="${item.title}"
                            data-location="${item.region || ''}"
                            data-duration="${item.durationDays || 3} Days"
                            data-elevation="${item.elevation || ''}"
                            data-difficulty="${item.difficulty}"
                            data-desc="${item.description}"
                            data-price="${item.basePrice || item.price}"
                        >
                            Book Trek ($${item.basePrice || item.price})
                        </button>
                    </div>
                </div>

            </div>

        </div>
    `).join("");

    // 2. HTML inject hone ke turant BAAD GSAP ScrollTrigger animation chalegi
    gsap.from('.uiverse-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#mountainsGrid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

/* ==========================================================================
   5. Search & Filter Engine start
   ========================================================================== */

// 1. Ensure mockMountainData exists (Sample format check)
// Aggar aap ne already global mockMountainData banaya hua hai, toh wo use hoga.
const dataToFilter = typeof mockMountainData !== "undefined" ? mockMountainData : [];

function initFilterAndSearchSystem() {
    const searchInput = document.getElementById("searchInput") || document.getElementById("trekSearchInput");
    const diffSelect = document.getElementById("difficultySelect");
    const regionSelect = document.getElementById("regionSelect");

    const applyFilters = () => {
        // Safe check for query
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const diffVal = diffSelect ? diffSelect.value.toLowerCase() : "all";
        const regionVal = regionSelect ? regionSelect.value.toLowerCase() : "all";

        const filtered = dataToFilter.filter(item => {
            // Safely get string values (prevents crash if title/description is null or missing)
            const title = (item.title || "").toLowerCase();
            const description = (item.description || "").toLowerCase();
            const itemDiff = (item.difficulty || "").toLowerCase();
            const itemRegion = (item.region || "").toLowerCase();

            // Search matching logic
            const matchesSearch = !query || title.includes(query) || description.includes(query);
            const matchesDiff = diffVal === "all" || itemDiff === diffVal;
            const matchesRegion = regionVal === "all" || itemRegion === regionVal;

            return matchesSearch && matchesDiff && matchesRegion;
        });

        // Safe rendering call
        if (typeof renderMountainCards === "function") {
            renderMountainCards(filtered);
        } else {
            console.error("renderMountainCards function nahi mila!");
        }
    };

    // Attach listeners safely
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (diffSelect) diffSelect.addEventListener("change", applyFilters);
    if (regionSelect) regionSelect.addEventListener("change", applyFilters);

    // Initial render call taake page load par saara data dikhe
    applyFilters();
}

// 2. IMPORTANT: Function ko HTML load hone ke baad call karein
document.addEventListener("DOMContentLoaded", () => {
    initFilterAndSearchSystem();
});
/* ==========================================================================
   5. Search & Filter Engine end
   ========================================================================== */

          


/* ==========================================================================
   6. Modal & Live Price Calculation
   ========================================================================== */
function initBookingModalSystem() {
    const trekModal = document.getElementById("trekModal");
    const trekkersInput = document.getElementById("trekkersCount");
    const gearAddon = document.getElementById("gearAddon");
    const totalPriceElem = document.getElementById("totalBookingPrice");
    const bookingForm = document.getElementById("trekBookingForm");

    if (!trekModal) return;

    // Populating Modal Data on Open
    trekModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        if (!button) return;

        const title = button.getAttribute("data-title") || "Mountain Trek";
        const location = button.getAttribute("data-location") || "N/A";
        const duration = button.getAttribute("data-duration") || "N/A";
        const elevation = button.getAttribute("data-elevation") || "N/A";
        const difficulty = button.getAttribute("data-difficulty") || "N/A";
        const desc = button.getAttribute("data-desc") || "";
        activeTrekPrice = parseInt(button.getAttribute("data-price") || "1500", 10);

        // Fill Modal Fields safely
        const setElemText = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.textContent = txt;
        };

        setElemText("trekModalLabel", title);
        setElemText("modalLocation", location);
        setElemText("modalDuration", duration);
        setElemText("modalElevation", elevation);
        setElemText("modalDifficulty", difficulty);
        setElemText("modalDescription", desc);

        calculateTotal();
    });

    // Live Price Calculation Logic
    const calculateTotal = () => {
        if (!totalPriceElem) return;

        const trekkers = trekkersInput ? (parseInt(trekkersInput.value, 10) || 1) : 1;
        const gearCost = gearAddon && gearAddon.checked ? 250 : 0;

        const total = (activeTrekPrice + gearCost) * trekkers;
        totalPriceElem.textContent = `$${total.toLocaleString()}`;
    };

    if (trekkersInput) trekkersInput.addEventListener("input", calculateTotal);
    if (gearAddon) gearAddon.addEventListener("change", calculateTotal);

    // Form Submission
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const dateInput = document.getElementById("bookingDate");
            
            if (dateInput && !dateInput.value) {
                alert("Pehle booking start date select karein.");
                return;
            }

            alert(`🎉 Booking Confirmed!\nTotal Price: ${totalPriceElem ? totalPriceElem.textContent : ''}\nDate: ${dateInput ? dateInput.value : ''}`);
            
            const modalInstance = bootstrap.Modal.getInstance(trekModal);
            if (modalInstance) modalInstance.hide();
        });
    }
}

/* ==========================================================================
   ADVANCE REAL-WORLD LEAFLET MAP LOGIC             Mountain Map Section Start
   ========================================================================== */

function initAdvanceMountainMap() {
    const mapElement = document.getElementById("leafletMap");
    if (!mapElement) return;

    // 1. Initialize Map centered on Karakoram / Northern Pakistan region
    const map = L.map('leafletMap', {
        center: [35.5, 75.5],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false // Prevents accidental page-scroll disruption
    });

    // 2. Add High-Quality Topo/Terrain Tile Layer (Esri World Topo Map)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    }).addTo(map);

    // 3. Peaks Data Array with exact GPS Coordinates
    const peaks = [
        {
            name: "K2 Peak & Basecamp",
            coords: [35.8814, 76.5133],
            elevation: "8,611m",
            weather: "-14°C 🌨️",
            difficulty: "Extreme",
            type: "hard"
        },
        {
            name: "Nanga Parbat",
            coords: [35.2372, 74.5891],
            elevation: "8,126m",
            weather: "-9°C 🌬️",
            difficulty: "Hard",
            type: "hard"
        },
        {
            name: "Rakaposhi Viewpoint",
            coords: [36.1113, 74.4889],
            elevation: "7,788m",
            weather: "2°C 🌤️",
            difficulty: "Moderate",
            type: "mod"
        },
        {
            name: "Passu Cones (Hunza)",
            coords: [36.4678, 74.8872],
            elevation: "6,106m",
            weather: "6°C ☀️",
            difficulty: "Easy / Trek",
            type: "mod"
        }
    ];

    // 4. Custom Marker Creation & Polyline Trail
    const trailCoordinates = [];

    peaks.forEach(peak => {
        trailCoordinates.push(peak.coords);

        // Custom HTML Marker Icon
        const customIcon = L.divIcon({
            className: 'custom-pin-wrapper',
            html: `<div class="custom-pin-marker">🏔️</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        // Popup Glass Card Content
        const popupHTML = `
            <div class="map-popup-card ${peak.type}">
                <span class="badge">${peak.difficulty}</span>
                <h3>${peak.name}</h3>
                <div class="map-popup-stats">
                    <div>
                        <span>Elevation</span>
                        <strong>${peak.elevation}</strong>
                    </div>
                    <div>
                        <span>Live Weather</span>
                        <strong>${peak.weather}</strong>
                    </div>
                </div>
            </div>
        `;

        // Add Marker to Map
        L.marker(peak.coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(popupHTML);
    });

    // 5. Draw Animated Dotted Trail Connecting the Peaks
    L.polyline(trailCoordinates, {
        color: '#3b82f6',
        weight: 3,
        dashArray: '8, 8',
        opacity: 0.8
    }).addTo(map);
}

// Initialize Map on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initAdvanceMountainMap();
});

/* ==========================================================================
   PRO ALTITUDE & AMS CALCULATOR LOGIC
   ========================================================================== */
function initProCalculator() {
    const fitnessSelect = document.getElementById("proFitness");
    const pastAltInput = document.getElementById("proPastAlt");
    const targetPeakSelect = document.getElementById("proTargetPeak");
    const acclimInput = document.getElementById("proAcclim");

    const pastAltVal = document.getElementById("pastAltVal");
    const acclimVal = document.getElementById("acclimVal");

    const scoreNum = document.getElementById("scoreNum");
    const gaugeCircle = document.getElementById("gaugeCircle");
    const riskStatusBadge = document.getElementById("riskStatusBadge");
    
    const oxLevelVal = document.getElementById("oxLevelVal");
    const oxBar = document.getElementById("oxBar");
    const amsRiskVal = document.getElementById("amsRiskVal");
    const amsBar = document.getElementById("amsBar");

    if (!fitnessSelect || !pastAltInput) return;

    function updateProCalculation() {
        const fitness = parseInt(fitnessSelect.value);
        const pastAlt = parseInt(pastAltInput.value);
        const targetAlt = parseInt(targetPeakSelect.value);
        const acclimDays = parseInt(acclimInput.value);

        // Update Slider text labels
        pastAltVal.innerText = `${pastAlt}m`;
        acclimVal.innerText = `${acclimDays} Days`;

        // 1. Oxygen Percentage Calculation (Standard Barometric Formula Approximation)
        // Sea level = 20.9%, drops exponentially with altitude
        const oxygenPct = Math.round(100 * Math.exp(-targetAlt / 8200));
        oxLevelVal.innerText = `${oxygenPct}% (vs Sea Level)`;
        oxBar.style.width = `${oxygenPct}%`;

        // 2. AMS (Acute Mountain Sickness) Risk Factor Calculation
        const altGap = targetAlt - pastAlt;
        let amsScore = (altGap / 60) - (acclimDays * 8) - (fitness * 10);
        if (amsScore < 10) amsScore = 10;
        if (amsScore > 95) amsScore = 95;

        // 3. Overall Readiness/Safety Score
        let safetyScore = 100 - (amsScore * 0.85) + (fitness * 8);
        if (safetyScore > 98) safetyScore = 98;
        if (safetyScore < 10) safetyScore = 10;
        safetyScore = Math.round(safetyScore);

        // Update Gauge Ring SVG (Circumference = 314)
        const offset = 314 - (314 * safetyScore / 100);
        gaugeCircle.style.strokeDashoffset = offset;
        scoreNum.innerText = `${safetyScore}%`;

        // Update UI Badges & AMS Bars based on score
        if (safetyScore >= 75) {
            gaugeCircle.style.stroke = "#10b981";
            riskStatusBadge.style.background = "rgba(16, 185, 129, 0.2)";
            riskStatusBadge.style.color = "#10b981";
            riskStatusBadge.innerText = "Optimal Expedition Readiness";

            amsRiskVal.innerText = "Low Risk (Safe)";
            amsBar.style.width = "20%";
            amsBar.style.background = "#10b981";
        } else if (safetyScore >= 45) {
            gaugeCircle.style.stroke = "#f59e0b";
            riskStatusBadge.style.background = "rgba(245, 158, 11, 0.2)";
            riskStatusBadge.style.color = "#f59e0b";
            riskStatusBadge.innerText = "Moderate AMS Risk - Rest Mandatory";

            amsRiskVal.innerText = "Moderate (Acclimatize First)";
            amsBar.style.width = "55%";
            amsBar.style.background = "#f59e0b";
        } else {
            gaugeCircle.style.stroke = "#ef4444";
            riskStatusBadge.style.background = "rgba(239, 68, 68, 0.2)";
            riskStatusBadge.style.color = "#ef4444";
            riskStatusBadge.innerText = "Severe Hypoxia Risk";

            amsRiskVal.innerText = "High / Dangerous (Unsafe)";
            amsBar.style.width = "90%";
            amsBar.style.background = "#ef4444";
        }
    }

    fitnessSelect.addEventListener("change", updateProCalculation);
    pastAltInput.addEventListener("input", updateProCalculation);
    targetPeakSelect.addEventListener("change", updateProCalculation);
    acclimInput.addEventListener("input", updateProCalculation);

    updateProCalculation();
}

document.addEventListener("DOMContentLoaded", () => {
    initProCalculator();
});
/* ==========================================================================
   EXPEDITION ITINERARY ACCORDION LOGIC   Day-by-Day Expedition Itinerary Accordion.
   ========================================================================== */
function initItineraryAccordion() {
    const accordionItems = document.querySelectorAll("#itineraryAccordion .accordion-item");

    if (!accordionItems.length) return;

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all open accordion items (Single Open Behavior)
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });

            // If it was not active before, toggle it open
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initItineraryAccordion();
});
/* ==========================================================================
   PRO RESPONSIVE BUDGET CALCULATOR LOGIC
   ========================================================================== */
function initProBudgetCalculator() {
    const groupSizeInput = document.getElementById("groupSize");
    const tripDaysInput = document.getElementById("tripDays");
    const expTierSelect = document.getElementById("expTier");
    const gearChecks = document.querySelectorAll(".gear-check");

    const groupSizeVal = document.getElementById("groupSizeVal");
    const tripDaysVal = document.getElementById("tripDaysVal");
    
    const totalCostVal = document.getElementById("totalCostVal");
    const perPersonVal = document.getElementById("perPersonVal");
    const baseFeeVal = document.getElementById("baseFeeVal");
    const gearFeeVal = document.getElementById("gearFeeVal");
    const discountVal = document.getElementById("discountVal");
    const discountBadge = document.getElementById("discountBadge");

    if (!groupSizeInput || !tripDaysInput) return;

    function updateProBudget() {
        const groupSize = parseInt(groupSizeInput.value);
        const tripDays = parseInt(tripDaysInput.value);
        const dailyRate = parseInt(expTierSelect.value);

        // Update Slider Badge Labels
        groupSizeVal.innerText = `${groupSize} Trekker${groupSize > 1 ? 's' : ''}`;
        tripDaysVal.innerText = `${tripDays} Days`;

        // 1. Base Cost
        const baseCost = groupSize * tripDays * dailyRate;

        // 2. Gear Rentals Cost
        let gearDailyRate = 0;
        gearChecks.forEach(chk => {
            if (chk.checked) gearDailyRate += parseInt(chk.value);
        });
        const gearCost = groupSize * tripDays * gearDailyRate;

        // 3. Dynamic Group Discount Tier Algorithm
        let discountPct = 0;
        if (groupSize >= 8) discountPct = 20;
        else if (groupSize >= 5) discountPct = 12;
        else if (groupSize >= 2) discountPct = 5;

        const subtotal = baseCost + gearCost;
        const discountAmt = Math.round((subtotal * discountPct) / 100);
        const grandTotal = subtotal - discountAmt;
        const perPersonCost = Math.round(grandTotal / groupSize);

        // Update UI Outputs
        baseFeeVal.innerText = `$${baseCost.toLocaleString()}`;
        gearFeeVal.innerText = `$${gearCost.toLocaleString()}`;
        discountVal.innerText = `-$${discountAmt.toLocaleString()}`;
        discountBadge.innerText = `-${discountPct}% Group Discount`;
        
        totalCostVal.innerText = `$${grandTotal.toLocaleString()}`;
        perPersonVal.innerText = `($${perPersonCost.toLocaleString()} per trekker)`;
    }

    groupSizeInput.addEventListener("input", updateProBudget);
    tripDaysInput.addEventListener("input", updateProBudget);
    expTierSelect.addEventListener("change", updateProBudget);
    gearChecks.forEach(chk => chk.addEventListener("change", updateProBudget));

    updateProBudget();
}

document.addEventListener("DOMContentLoaded", () => {
    initProBudgetCalculator();
});

/* ==========================================================================
   PROCEED TO BOOKING BUTTON CLICK LOGIC
   ========================================================================== */
function initCheckoutButton() {
    const checkoutBtn = document.querySelector(".checkout-btn");
    const bookingModal = document.getElementById("bookingModal"); // Modal Popup Wrapper

    if (!checkoutBtn) return;

    checkoutBtn.addEventListener("click", () => {
        // Calculator se current dynamic calculations uthana
        const totalCost = document.getElementById("totalCostVal")?.innerText || "$0";
        const perPerson = document.getElementById("perPersonVal")?.innerText || "";
        const groupSize = document.getElementById("groupSizeVal")?.innerText || "";

        console.log(`Booking Triggered: Total: ${totalCost}, Group: ${groupSize}`);

        // Modal Form ke andar values fill karna (Agar modal HTML mein majood hai)
        const modalTotalInput = document.getElementById("modalTotalCost");
        if (modalTotalInput) {
            modalTotalInput.innerText = `${totalCost} ${perPerson}`;
        }

        // Modal ko display active karna
        if (bookingModal) {
            bookingModal.classList.add("active");
        } else {
            // Backup Alert agar modal abhi create nahi hua
            alert(`Expedition Booking Summary:\nTotal Cost: ${totalCost}\nGroup: ${groupSize}\n\nRedirecting to Booking Confirmation...`);
        }
    });
}

// Call inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initCheckoutButton();
});

/* ==========================================================================
   EXPEDITION BOOKING MODAL LOGIC
   ========================================================================== */
function initBookingModalController() {
    const checkoutBtn = document.querySelector(".checkout-btn");
    const bookingModal = document.getElementById("bookingModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const expeditionForm = document.getElementById("expeditionForm");

    if (!checkoutBtn || !bookingModal) return;

    // 1. OPEN MODAL & INJECT CALCULATED COSTS
    checkoutBtn.addEventListener("click", () => {
        const totalCost = document.getElementById("totalCostVal")?.innerText || "$0";
        const perPerson = document.getElementById("perPersonVal")?.innerText || "";

        const modalTotalInput = document.getElementById("modalTotalCost");
        if (modalTotalInput) {
            modalTotalInput.innerText = `${totalCost} ${perPerson}`;
        }

        bookingModal.classList.add("active");
    });

    // 2. CLOSE MODAL FUNCTION
    const closeModal = () => {
        bookingModal.classList.remove("active");
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    // Close when clicking outside the card on the dark backdrop
    bookingModal.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            closeModal();
        }
    });

    // Close on Escape Key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && bookingModal.classList.contains("active")) {
            closeModal();
        }
    });

    // 3. FORM SUBMIT HANDLER
    if (expeditionForm) {
        expeditionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your expedition request has been submitted successfully. Our team will contact you within 24 hours.");
            closeModal();
            expeditionForm.reset();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initProBudgetCalculator();
    initBookingModalController();
});

/* ==========================================================================
   FOOTER NEWSLETTER SUBSCRIPTION LOGIC
   ========================================================================== */
function initFooterNewsletter() {
    const newsletterForm = document.getElementById("footerNewsletterForm");

    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Page reload hone se rokne ke liye

        const emailInput = newsletterForm.querySelector("input[type='email']");
        const userEmail = emailInput ? emailInput.value.trim() : "";

        if (userEmail === "") {
            showToastNotification("Please enter a valid email address.", "error");
            return;
        }

        // Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            showToastNotification("Please enter a valid email format.", "error");
            return;
        }

        // Success Response Handling
        console.log(`Subscribed Email: ${userEmail}`);
        showToastNotification("Thank you for subscribing to TravelEase Expedition Updates!", "success");

        // Input Field Reset
        newsletterForm.reset();
    });
}

/* Custom Toast Notification Function */
function showToastNotification(message, type = "success") {
    // Purana toast remove karna agar screen par ho
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) existingToast.remove();

    // Create Toast Container
    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
        <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Animation display trigger
    setTimeout(() => toast.classList.add("show"), 100);

    // Auto Hide & Remove Toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}