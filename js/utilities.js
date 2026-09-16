document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Checklist Percentage Counter
  const checkboxes = document.querySelectorAll(".gear-item");
  const progressBadge = document.getElementById("checklistProgress");

  function updateProgress() {
    let checkedCount = 0;
    checkboxes.forEach(function (cb) {
      if (cb.checked) {
        checkedCount++;
      }
    });

    const percentage = Math.round((checkedCount / checkboxes.length) * 100);
    progressBadge.textContent = percentage + "% Completed";

    if (percentage === 100) {
      progressBadge.className = "badge fs-6 bg-success";
    } else {
      progressBadge.className = "badge fs-6 bg-primary";
    }
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener("change", updateProgress);
  });


  // 2. Altitude & Oxygen Range Estimator
  const rangeInput = document.getElementById("altitudeRange");
  const altitudeVal = document.getElementById("altitudeVal");
  const oxygenLevel = document.getElementById("oxygenLevel");
  const riskLevel = document.getElementById("riskLevel");

  rangeInput.addEventListener("input", function (e) {
    const val = e.target.value;
    altitudeVal.textContent = val + "m";

    // Oxygen percentage estimate calculation
    const calcOxygen = Math.max(40, Math.round(100 - ((val - 1000) / 1000) * 10));
    oxygenLevel.textContent = calcOxygen + "%";

    if (val < 3000) {
      riskLevel.textContent = "Low Risk";
      riskLevel.className = "text-success";
    } else if (val < 5500) {
      riskLevel.textContent = "Moderate Risk";
      riskLevel.className = "text-warning";
    } else {
      riskLevel.textContent = "High Risk";
      riskLevel.className = "text-danger";
    }
  });

});

/******************************************************************/
 document.addEventListener("DOMContentLoaded", function () {
  
  // Gear Checklist Logic
  const gearCheckboxes = document.querySelectorAll(".gear-item");
  const progressText = document.getElementById("overallProgressText");
  const progressBar = document.getElementById("overallProgressBar");

  function updateChecklistProgress() {
    if (!gearCheckboxes.length) return;

    let checkedCount = 0;
    gearCheckboxes.forEach(function (cb) {
      if (cb.checked) {
        checkedCount++;
        cb.parentElement.classList.add("text-decoration-line-through", "text-secondary");
      } else {
        cb.parentElement.classList.remove("text-decoration-line-through", "text-secondary");
      }
    });

    const totalItems = gearCheckboxes.length;
    const percentage = Math.round((checkedCount / totalItems) * 100);

    if (progressText) progressText.textContent = percentage + "%";
    if (progressBar) {
      progressBar.style.width = percentage + "%";
      progressBar.setAttribute("aria-valuenow", percentage);
      
      // Color change on completion
      if (percentage === 100) {
        progressBar.classList.remove("bg-info");
        progressBar.classList.add("bg-success");
      } else {
        progressBar.classList.remove("bg-success");
        progressBar.classList.add("bg-info");
      }
    }
  }

  gearCheckboxes.forEach(function (cb) {
    cb.addEventListener("change", updateChecklistProgress);
  });

});
/*****************************************************/ 
// Add inside your DOMContentLoaded block in js/utilities.js

const altitudeSlider = document.getElementById("altitudeSlider");
const altitudeDisplay = document.getElementById("altitudeDisplay");
const oxygenPercentage = document.getElementById("oxygenPercentage");
const oxygenProgressBar = document.getElementById("oxygenProgressBar");
const riskBadge = document.getElementById("riskBadge");
const altitudeTip = document.getElementById("altitudeTip");

function updateAltitudeCalculator() {
  if (!altitudeSlider) return;

  const meters = parseInt(altitudeSlider.value);
  
  // Format number with comma (e.g. 3,000 m)
  altitudeDisplay.textContent = meters.toLocaleString() + " m";

  // Approximate barometric effective oxygen calculation relative to sea level (20.9%)
  // At sea level (0m) -> 100% relative oxygen. Decreases exponentially with height.
  const relativeOxygen = Math.max(35, Math.round(100 * Math.exp(-meters / 7500)));
  
  oxygenPercentage.textContent = relativeOxygen + "%";
  oxygenProgressBar.style.width = relativeOxygen + "%";

  // Progress bar color based on oxygen
  if (relativeOxygen > 75) {
    oxygenProgressBar.className = "progress-bar bg-info";
  } else if (relativeOxygen > 55) {
    oxygenProgressBar.className = "progress-bar bg-warning";
  } else {
    oxygenProgressBar.className = "progress-bar bg-danger";
  }

  // Altitude Risk logic & Tips
  if (meters < 2500) {
    riskBadge.textContent = "Low Risk";
    riskBadge.className = "badge bg-success fs-6";
    altitudeTip.innerHTML = "💡 <strong>Advice:</strong> Minimal risk of AMS (Acute Mountain Sickness). Normal trekking pace works fine.";
  } else if (meters < 4000) {
    riskBadge.textContent = "Moderate Risk";
    riskBadge.className = "badge bg-warning text-dark fs-6";
    altitudeTip.innerHTML = "⚠️ <strong>Advice:</strong> High altitude. Climb no more than 500m per day and drink 3-4L of water daily.";
  } else if (meters < 5500) {
    riskBadge.textContent = "High Risk";
    riskBadge.className = "badge bg-danger fs-6";
    altitudeTip.innerHTML = "🚨 <strong>Advice:</strong> Very High altitude. Supplementary oxygen recommended. Rest days are mandatory.";
  } else {
    riskBadge.textContent = "Extreme / Death Zone";
    riskBadge.className = "badge bg-dark text-danger border border-danger fs-6";
    altitudeTip.innerHTML = "💀 <strong>Advice:</strong> Extreme Death Zone! Oxygen tanks and specialized mountaineering crew essential.";
  }
}

if (altitudeSlider) {
  altitudeSlider.addEventListener("input", updateAltitudeCalculator);
  // Initial call on page load
  updateAltitudeCalculator();
}
/****************************************************************** */
// Add inside your DOMContentLoaded block in js/utilities.js

const weatherData = [
  { name: "K2 Peak", category: "peaks", altitude: "8,611 m", summerTemp: "15°C to -10°C", winterTemp: "-30°C to -50°C", bestSeason: "July - August", open: true },
  { name: "Nanga Parbat", category: "peaks", altitude: "8,126 m", summerTemp: "10°C to -8°C", winterTemp: "-25°C to -45°C", bestSeason: "June - August", open: true },
  { name: "Broad Peak", category: "peaks", altitude: "8,051 m", summerTemp: "12°C to -12°C", winterTemp: "-28°C to -48°C", bestSeason: "July - August", open: true },
  { name: "Fairy Meadows", category: "treks", altitude: "3,300 m", summerTemp: "15°C to 25°C", winterTemp: "-10°C to -20°C", bestSeason: "May - September", open: true },
  { name: "Concordia & Baltoro", category: "treks", altitude: "4,600 m", summerTemp: "5°C to -5°C", winterTemp: "-20°C to -35°C", bestSeason: "Late June - August", open: true },
  { name: "Rakaposhi Base Camp", category: "treks", altitude: "3,500 m", summerTemp: "12°C to 20°C", winterTemp: "-12°C to -22°C", bestSeason: "May - October", open: true },
  { name: "K2 Base Camp Trek", category: "treks", altitude: "5,150 m", summerTemp: "8°C to -10°C", winterTemp: "-25°C to -40°C", bestSeason: "July - August", open: true }
];

function renderWeatherTable(filterCategory = "all") {
  const tbody = document.getElementById("weatherMatrixBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const filtered = weatherData.filter(item => filterCategory === "all" || item.category === filterCategory);

  filtered.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="fw-bold text-light">${item.name}</td>
      <td><span class="badge bg-secondary bg-opacity-50 text-info border border-info border-opacity-25">${item.altitude}</span></td>
      <td class="text-warning">${item.summerTemp}</td>
      <td class="text-primary-emphasis" style="color: #93c5fd !important;">${item.winterTemp}</td>
      <td><small class="text-light">${item.bestSeason}</small></td>
      <td class="text-end">
        <span class="badge ${item.open ? 'bg-success' : 'bg-danger'} rounded-pill">
          ${item.open ? 'Open Trek' : 'Restricted'}
        </span>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Filter button click handlers
const filterBtns = document.querySelectorAll(".filter-weather-btn");
filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    filterBtns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const category = this.getAttribute("data-filter");
    renderWeatherTable(category);
  });
});

// Initial Render
renderWeatherTable();
/*********************************************************** */
// ==========================================================================
// Tool 5: Budget & Expense Estimator JavaScript Logic
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  const durationSlider = document.getElementById("durationSlider");
  const durationDisplay = document.getElementById("durationDisplay");
  const groupSizeSlider = document.getElementById("groupSizeSlider");
  const groupSizeDisplay = document.getElementById("groupSizeDisplay");
  
  const porterCheckbox = document.getElementById("porterCheckbox");
  const gearCheckbox = document.getElementById("gearCheckbox");
  const helicopterCheckbox = document.getElementById("helicopterCheckbox");

  const totalCostDisplay = document.getElementById("totalCostDisplay");
  const perPersonCostDisplay = document.getElementById("perPersonCostDisplay");
  const budgetTierBadge = document.getElementById("budgetTierBadge");
  const budgetAdvice = document.getElementById("budgetAdvice");

  function calculateTrekBudget() {
    if (!durationSlider || !groupSizeSlider) return;

    const days = parseInt(durationSlider.value);
    const people = parseInt(groupSizeSlider.value);

    // Update displays
    durationDisplay.textContent = days + " Days";
    groupSizeDisplay.textContent = people + " Explorer" + (people > 1 ? "s" : "");

    // Base cost calculation rules (PKR per day per person base)
    let dailyRatePerPerson = 4500; // Food, local transport, basic permits

    // Add-on calculations
    let addOnsPerDay = 0;
    if (porterCheckbox && porterCheckbox.checked) addOnsPerDay += 2500; // Porter/Guide share per day
    if (gearCheckbox && gearCheckbox.checked) addOnsPerDay += 1200;    // Rental gear share per day
    if (helicopterCheckbox && helicopterCheckbox.checked) addOnsPerDay += 5000; // Emergency fund / insurance share

    const totalPerPerson = (dailyRatePerPerson + addOnsPerDay) * days;
    const grandTotal = totalPerPerson * people;

    // Format numbers with commas (e.g., 150,000 PKR)
    totalCostDisplay.textContent = grandTotal.toLocaleString() + " PKR";
    perPersonCostDisplay.textContent = totalPerPerson.toLocaleString() + " PKR / person";

    // Tier badge & advice logic
    if (grandTotal < 150000) {
      budgetTierBadge.textContent = "Backpacker / Budget";
      budgetTierBadge.className = "badge bg-success fs-6";
      budgetAdvice.innerHTML = "💡 <strong>Tip:</strong> Great for local group-guided hiking trails and guest houses.";
    } else if (grandTotal < 400000) {
      budgetTierBadge.textContent = "Standard Expedition";
      budgetTierBadge.className = "badge bg-warning text-dark fs-6";
      budgetAdvice.innerHTML = "💡 <strong>Tip:</strong> Covers professional local guide services, standard porters, and good tent gear.";
    } else {
      budgetTierBadge.textContent = "VIP Pro Expedition";
      budgetTierBadge.className = "badge bg-danger fs-6";
      budgetAdvice.innerHTML = "💡 <strong>Tip:</strong> Full luxury support, high-altitude porters, personal gear, and rescue standby.";
    }
  }

  // Attach event listeners to all controls
  const inputs = [durationSlider, groupSizeSlider, porterCheckbox, gearCheckbox, helicopterCheckbox];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener("input", calculateTrekBudget);
      input.addEventListener("change", calculateTrekBudget);
    }
  });

  // Initial calculation on page load
  calculateTrekBudget();
});