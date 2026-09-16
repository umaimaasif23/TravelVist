document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. Sticky Navbar on Scroll
  // ==========================================

const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

// 2. Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ==========================================
// Hero Section Interactive Handlers
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroVideo');

  // Page Unfocus/Tab change monitor to preserve bandwidth
  window.addEventListener('blur', () => {
    if (heroVideo && heroVideo.contentWindow) {
      heroVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });

  window.addEventListener('focus', () => {
    if (heroVideo && heroVideo.contentWindow) {
      heroVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  });
});





  // ==========================================
  // 2. Animated Counter (IntersectionObserver)
  // ==========================================
  const statsSection = document.querySelector('.stats');
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || "+";
      let count = 0;
      const speed = 40; // Total steps for animation
      const increment = Math.ceil(target / speed);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count + suffix;
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCount();
    });
  };

  // Scroll event ki jagah performance friendly Observer
  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        startCounters();
        animated = true;
        observer.disconnect(); // Animation chalne ke baad observer band
      }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  // ==========================================
  // 3. Swiper 3D Carousel Initialization
  // ==========================================
  if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // ==========================================
  // 4. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
//////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. Sticky Navbar on Scroll
  // ==========================================
  const header = document.querySelector('header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ==========================================
  // 2. Hero Video Focus/Blur Handlers
  // ==========================================
  const heroVideo = document.getElementById('heroVideo');

  // Page Tab change hone par bandwidth save karne k liye video pause/play
  window.addEventListener('blur', () => {
    if (heroVideo && heroVideo.contentWindow) {
      heroVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });

  window.addEventListener('focus', () => {
    if (heroVideo && heroVideo.contentWindow) {
      heroVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  });

  // ==========================================
  // 3. Animated Counter (IntersectionObserver)
  // ==========================================
  const statsSection = document.querySelector('.stats');
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || "+";
      let count = 0;
      const speed = 40; // Total steps
      const increment = Math.ceil(target / speed);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count + suffix;
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCount();
    });
  };

  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        startCounters();
        animated = true;
        observer.disconnect(); // Animation chalne ke baad stop
      }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  // ==========================================
  // 4. Swiper 3D Carousel (If Swiper HTML Exists)
  // ==========================================
  if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // ==========================================
  // 5. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});

/////////////////////////////////////////////////////////////
/* ==========================================================================
   OUR STORY SECTION INTERACTIVE LOGIC
   ========================================================================== */

// 1. Scroll Reveal Animation (Section screen par aate hi smooth entrance)
function initStoryScrollAnimation() {
    const storySection = document.querySelector(".our-story");
    const storyImage = document.querySelector(".story-image");
    const storyText = document.querySelector(".story-text");

    if (!storySection) return;

    // Initial styles set karna (hidden status for entrance)
    storyImage.style.opacity = "0";
    storyImage.style.transform = "translateX(-50px)";
    storyImage.style.transition = "all 0.8s ease-out";

    storyText.style.opacity = "0";
    storyText.style.transform = "translateX(50px)";
    storyText.style.transition = "all 0.8s ease-out";

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Viewport mein aane par show karein
                storyImage.style.opacity = "1";
                storyImage.style.transform = "translateX(0)";

                storyText.style.opacity = "1";
                storyText.style.transform = "translateX(0)";
            }
        });
    }, { threshold: 0.25 });

    observer.observe(storySection);
}

// 2. Interactive 3D Parallax Tilt Effect on Mouse Move
function initStoryParallax() {
    const storySection = document.querySelector(".our-story");
    const storyImg = document.querySelector(".story-image img");

    if (!storySection || !storyImg) return;

    storySection.addEventListener("mousemove", (e) => {
        const rect = storySection.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);

        // Subtly tilt the image based on mouse coordinates
        const tiltX = (y / (rect.height / 2)) * -10; 
        const tiltY = (x / (rect.width / 2)) * 10;

        storyImg.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    // Mouse bahar jane par image ko original state mein reset karna
    storySection.addEventListener("mouseleave", () => {
        storyImg.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        storyImg.style.transition = "transform 0.5s ease";
    });

    storySection.addEventListener("mouseenter", () => {
        storyImg.style.transition = "none";
    });
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    initStoryScrollAnimation();
    initStoryParallax();
});
/* ==========================================================================
   STATS SECTION COUNTER ANIMATION LOGIC
   ========================================================================== */

function startStatsCounters() {
    const statCounters = document.querySelectorAll(".stats .counter");
    const speed = 200; // Counter speed (Jitna kam number, utni fast animation)

    statCounters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace("+", "").replace("%", "").replace(",", "");

            // Calculate step size
            const inc = Math.max(1, Math.ceil(target / speed));

            if (count < target) {
                let nextValue = count + inc;
                if (nextValue > target) nextValue = target;
                
                // Symbol formatting based on target value
                if (target === 99) {
                    counter.innerText = nextValue + "%";
                } else if (target >= 1000) {
                    counter.innerText = nextValue.toLocaleString() + "+";
                } else {
                    counter.innerText = nextValue + "+";
                }

                setTimeout(updateCount, 25);
            } else {
                // Final value formatting
                if (target === 99) {
                    counter.innerText = target + "%";
                } else if (target >= 1000) {
                    counter.innerText = target.toLocaleString() + "+";
                } else {
                    counter.innerText = target + "+";
                }
            }
        };

        updateCount();
    });
}

// Intersection Observer (Tabhi chalega jab user scroll karke Stats section par aaye)
function initStatsObserver() {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    let hasRun = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                startStatsCounters();
                hasRun = true; // Taake sirf ek hi baar animate ho
            }
        });
    }, { threshold: 0.3 }); // 30% section screen par aate hi trigger hoga

    observer.observe(statsSection);
}

// Initialize on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initStatsObserver();
});
/* ==========================================================================
   4. FEATURES SECTION LOGIC, COUNTERS & MODAL POPUP
   ========================================================================== */

// Logic 1: Number Counter Animation Function
function startFeatureCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const speed = 200; // Counter speed (lower = faster)

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace("+", "").replace("%", "");

            // Calculate increment step
            const inc = Math.max(1, Math.ceil(target / speed));

            if (count < target) {
                let nextValue = count + inc;
                if (nextValue > target) nextValue = target;
                
                // Formatting symbol output
                if (target === 100) {
                    counter.innerText = nextValue + "%";
                } else if (target === 1200) {
                    counter.innerText = nextValue + "+";
                } else {
                    counter.innerText = nextValue;
                }

                setTimeout(updateCount, 25);
            } else {
                if (target === 100) counter.innerText = target + "%";
                else if (target === 1200) counter.innerText = target + "+";
                else counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Logic 2: Intersection Observer (Jab viewport par aye tab counter chalega)
function initCounterObserver() {
    const featureSection = document.querySelector(".features-section");
    if (!featureSection) return;

    let hasRun = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                startFeatureCounters();
                hasRun = true; // Taake sirf ek baar chale
            }
        });
    }, { threshold: 0.4 });

    observer.observe(featureSection);
}

// Logic 3: Modal Card Data & Popup Handlers
const featureDetailsData = {
    guides: {
        title: "Certified Local Guides",
        icon: "🏔️",
        description: "Our high-altitude mountaineers are certified by the K2 Mountaineering Association with 8+ years of experience. They carry full navigation tools, localized weather insights, and route expertise."
    },
    safety: {
        title: "100% Safety Record",
        icon: "🛡️",
        description: "Your safety is our prime concern. Every expedition includes Garmin InReach Satellite SOS communication, Wilderness First Responder (WFR) certified leaders, and comprehensive emergency evacuation protocols."
    },
    gear: {
        title: "Premium Expedition Gear",
        icon: "🎪",
        description: "We partner with top brands like The North Face & Red Fox to provide 4-season windproof tents, thermal sleeping bags rated for -15°C, high-grade stoves, and fresh, high-calorie organic meals."
    }
};

// Function to Open Modal Card
function showFeatureDetails(type) {
    const data = featureDetailsData[type];
    const modal = document.getElementById("featureModal");

    if (data && modal) {
        document.getElementById("modalTitle").innerText = data.title;
        document.getElementById("modalIcon").innerText = data.icon;
        document.getElementById("modalDescription").innerText = data.description;
        
        modal.classList.add("active");
    }
}

// Function to Close Modal Card
function closeFeatureModal() {
    const modal = document.getElementById("featureModal");
    if (modal) {
        modal.classList.remove("active");
    }
}

// Logic 4: Event Listeners Init
document.addEventListener("DOMContentLoaded", () => {
    initCounterObserver();

    // Close Modal when clicking outside the popup card
    document.addEventListener("click", (e) => {
        const modal = document.getElementById("featureModal");
        if (e.target === modal) {
            closeFeatureModal();
        }
    });
});

/* ==========================================================================
   ADVANCED 3D CAROUSEL & INTERACTIVE MODAL LOGIC
   ========================================================================== */

function initAdvancedTeam3DCarousel() {
    const inner = document.querySelector(".team .inner");
    const wrapper = document.querySelector(".team .wrapper");
    const cards = document.querySelectorAll(".team .card");

    if (!inner || !wrapper) return;

    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let targetRotation = 0;
    let dragSensitivity = 0.35;
    let autoRotateTimeout = null;
    let dragDistance = 0;

    // Helper: Animation Switch
    const pauseCSSAnimation = () => {
        inner.style.animationPlayState = "paused";
    };

    const resumeCSSAnimation = () => {
        inner.style.animationPlayState = "running";
        inner.style.transform = ""; // Reset inline transform for CSS keyframes
    };

    // Calculate current rotation angle from Matrix
    const getMatrixRotation = () => {
        const computedStyle = window.getComputedStyle(inner);
        const transform = computedStyle.transform;
        
        if (transform !== "none") {
            const values = transform.split("(")[1].split(")")[0].split(",");
            const a = parseFloat(values[0]);
            const b = parseFloat(values[2]);
            let radians = Math.atan2(b, a);
            let angle = Math.round(radians * (180 / Math.PI));
            return angle < 0 ? angle + 360 : angle;
        }
        return currentRotation;
    };

    // ----------------------------------------------------
    // 1. Drag Controls
    // ----------------------------------------------------
    const handleDragStart = (e) => {
        isDragging = true;
        dragDistance = 0;
        clearTimeout(autoRotateTimeout);
        
        currentRotation = getMatrixRotation();
        pauseCSSAnimation();
        
        startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        
        const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
        dragDistance = Math.abs(deltaX);
        
        targetRotation = currentRotation + (deltaX * dragSensitivity);
        inner.style.transform = `rotateY(${targetRotation}deg)`;
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        
        // Dynamic momentum/inertia persistence update
        currentRotation = targetRotation;

        // Auto-resume continuous rotation after 3.5 seconds
        autoRotateTimeout = setTimeout(() => {
            if (!isDragging) resumeCSSAnimation();
        }, 3500);
    };

    // Mouse Listeners
    wrapper.addEventListener("mousedown", handleDragStart);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    // Touch Listeners
    wrapper.addEventListener("touchstart", handleDragStart, { passive: true });
    window.addEventListener("touchmove", handleDragMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);

    // Keyboard Arrow Controls
    wrapper.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            pauseCSSAnimation();
            const step = e.key === "ArrowLeft" ? -60 : 60;
            currentRotation = getMatrixRotation() + step;
            inner.style.transform = `rotateY(${currentRotation}deg)`;
            
            clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(resumeCSSAnimation, 4000);
        }
    });

    // ----------------------------------------------------
    // 2. Card Click & Advanced Modal Interaction
    // ----------------------------------------------------
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Drag ke dauran accidental click ignore karein
            if (dragDistance > 6) return;

            const name = card.querySelector("h3").innerText;
            const role = card.querySelector("p").innerText;
            const imgSrc = card.querySelector("img").src;
            const bio = card.getAttribute("data-bio") || "Experienced specialist passionate about outdoor expeditions and client satisfaction.";
            const socialData = JSON.parse(card.getAttribute("data-social") || "{}");
            
            // Dynamic card theme color accent
            const colorRgb = card.style.getPropertyValue("--color-card") || "13, 110, 253";

            showAdvancedModal({ name, role, imgSrc, bio, socialData, colorRgb });
        });
    });
}

// Advanced Modal Display Engine
function showAdvancedModal({ name, role, imgSrc, bio, socialData, colorRgb }) {
    const modal = document.getElementById("advTeamModal");
    const modalName = document.getElementById("advModalName");
    const modalRole = document.getElementById("advModalRole");
    const modalImg = document.getElementById("advModalImg");
    const modalBio = document.getElementById("advModalBio");
    const modalSocials = document.getElementById("advModalSocials");
    const overlay = modal.querySelector(".adv-modal-overlay");
    const closeBtn = modal.querySelector(".adv-modal-close");

    if (!modal) return;

    // Apply CSS Variables for dynamic accent branding
    modal.style.setProperty("--card-accent", `rgb(${colorRgb})`);
    modal.style.setProperty("--card-accent-rgb", colorRgb);

    // Set Data Dynamically
    modalName.innerText = name;
    modalRole.innerText = role;
    modalImg.src = imgSrc;
    modalBio.innerText = bio;

    // Build Social Buttons Dynamically
    modalSocials.innerHTML = "";
    Object.keys(socialData).forEach(key => {
        const a = document.createElement("a");
        a.href = socialData[key];
        a.className = "adv-social-btn";
        a.target = "_blank";
        a.innerText = key.charAt(0).toUpperCase() + key.slice(1);
        modalSocials.appendChild(a);
    });

    // Open Modal
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // Close Controls
    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    };

    closeBtn.onclick = closeModal;
    overlay.onclick = closeModal;

    // Keyboard ESC key close support
    const handleEsc = (e) => {
        if (e.key === "Escape") {
            closeModal();
            window.removeEventListener("keydown", handleEsc);
        }
    };
    window.addEventListener("keydown", handleEsc);
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    initAdvancedTeam3DCarousel();
});