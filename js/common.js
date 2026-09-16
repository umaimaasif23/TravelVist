///////////////////////////////////////////Navbar///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  loadDynamicNavbar();
});

function loadDynamicNavbar() {
  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Navbar loading failed");
      return response.text();
    })
    .then((data) => {
      navbarContainer.innerHTML = data;
      
      // Navbar load hone ke baad events re-attach karenge
      initNavbarLogic();
      highlightActiveNavLink();
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

function initNavbarLogic() {
  // 1. Sticky Header Scroll Event
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  }

  // 2. Mobile Hamburger Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

// Automatically highlights the active page link (Home, About, Mountains, etc.)
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
