
  /* ==========================================================================
                              Hero Section Wrapper
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. GSAP Entrance Animations ---
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.from('.badge-pill', { y: -30, opacity: 0, delay: 0.2 })
      .from('.hero-title', { y: 30, opacity: 0 }, '-=0.6')
      .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.6')
      .from('.glass-search-card', { y: 40, opacity: 0, scale: 0.95 }, '-=0.5')
      .from('.hero-stats', { y: 30, opacity: 0 }, '-=0.4');
  }

  // --- 2. Live Number Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = target / 60; // 60 steps animation

    const updateCounter = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });

  // --- 3. Dynamic Range Slider Indicator ---
  const durationInput = document.getElementById('durationInput');
  const durationVal = document.getElementById('durationVal');

  durationInput.addEventListener('input', (e) => {
    durationVal.textContent = e.target.value;
  });

  // --- 4. Search Autocomplete Functionality ---
  const trailInput = document.getElementById('trailInput');
  const suggestionsBox = document.getElementById('suggestionsBox');

  // Sample Database Trails
  const availableTrails = [
    'K2 Basecamp Trek',
    'Concordia & Baltoro Glacier',
    'Fairy Meadows & Nanga Parbat',
    'Rakaposhi Basecamp',
    'Shimshal Pass',
    'Rush Lake Trek',
    'Naran Kaghan Valley Trails'
  ];

  trailInput.addEventListener('input', () => {
    const value = trailInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = '';

    if (value.length < 2) {
      suggestionsBox.classList.add('hidden');
      return;
    }

    const filtered = availableTrails.filter((trail) =>
      trail.toLowerCase().includes(value)
    );

    if (filtered.length > 0) {
      filtered.forEach((trail) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = trail;
        item.addEventListener('click', () => {
          trailInput.value = trail;
          suggestionsBox.classList.add('hidden');
        });
        suggestionsBox.appendChild(item);
      });
      suggestionsBox.classList.remove('hidden');
    } else {
      suggestionsBox.classList.add('hidden');
    }
  });

  // Close suggestions on document click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.field-group')) {
      suggestionsBox.classList.add('hidden');
    }
  });

  // --- 5. Quick Filter Tag Chips ---
  const tagChips = document.querySelectorAll('.tag-chip');
  tagChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      trailInput.value = chip.getAttribute('data-tag');
      // Trigger focus glow
      trailInput.focus();
    });
  });

  // --- 6. Advanced Form Submit Handler ---
  const plannerForm = document.getElementById('heroPlannerForm');
  plannerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchData = {
      destination: trailInput.value,
      difficulty: document.getElementById('difficultySelect').value,
      durationDays: durationInput.value,
    };

    console.log('Advance Planner Query:', searchData);

    // Save search context to sessionStorage for planner results page
    sessionStorage.setItem('plannerSearchContext', JSON.stringify(searchData));

    // Optional redirect or trigger filter event
    alert(`Searching expeditions for "${searchData.destination}" (${searchData.durationDays} Days, Grade: ${searchData.difficulty})`);
  });
});

 /* ==========================================================================
                              TRIP SETUP FORM SECTION satrt
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Main Form DOM Elements Selection
  const destSelect = document.getElementById('destSelect');
  const tripDays = document.getElementById('tripDays');
  const daysDisplay = document.getElementById('daysDisplay');
  const climberCount = document.getElementById('climberCount');
  const subClimber = document.getElementById('subClimber');
  const addClimber = document.getElementById('addClimber');
  const packageTier = document.getElementById('packageTier');
  const liveBudget = document.getElementById('liveBudget');
  const personCostLabel = document.getElementById('personCostLabel');
  const expeditionForm = document.getElementById('expeditionForm');

  // 2. Alert Modal Elements Selection
  const alertModal = document.getElementById('alertModal');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');

  // --- Group Size Counter Controls ---
  addClimber.addEventListener('click', () => {
    let val = parseInt(climberCount.value);
    if (val < 15) {
      climberCount.value = val + 1;
      calculateExpeditionCost();
    }
  });

  subClimber.addEventListener('click', () => {
    let val = parseInt(climberCount.value);
    if (val > 1) {
      climberCount.value = val - 1;
      calculateExpeditionCost();
    }
  });

  // --- Duration Slider Update ---
  tripDays.addEventListener('input', (e) => {
    daysDisplay.textContent = e.target.value;
    calculateExpeditionCost();
  });

  // --- Dynamic Cost Calculation Algorithm ---
  function calculateExpeditionCost() {
    // Base Destination Cost
    const selectedDestOption = destSelect.options[destSelect.selectedIndex];
    const baseCost = selectedDestOption && selectedDestOption.dataset.base 
      ? parseFloat(selectedDestOption.dataset.base) 
      : 400;

    // Difficulty Grade Multiplier
    const difficultyMult = parseFloat(document.querySelector('input[name="difficulty"]:checked').dataset.mult);

    // Duration Days
    const days = parseInt(tripDays.value);

    // Package Per-Day Tier Cost
    const selectedPackage = packageTier.options[packageTier.selectedIndex];
    const packageDailyCost = selectedPackage && selectedPackage.dataset.tier 
      ? parseFloat(selectedPackage.dataset.tier) 
      : 25;

    // Climbers Group Size
    const climbers = parseInt(climberCount.value);

    // CALCULATION FORMULA: [(Base Cost * Difficulty) + (Daily Tier Cost * Days)] * Climbers
    const costPerPerson = Math.round((baseCost * difficultyMult) + (packageDailyCost * days));
    const totalExpeditionCost = costPerPerson * climbers;

    // Update Live Display
    liveBudget.textContent = totalExpeditionCost.toLocaleString();
    personCostLabel.textContent = `$${costPerPerson.toLocaleString()} / climber (${days} Days)`;
  }

  // --- Event Listeners for Live Calculation Trigger ---
  destSelect.addEventListener('change', calculateExpeditionCost);
  packageTier.addEventListener('change', calculateExpeditionCost);
  document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener('change', calculateExpeditionCost);
  });

  // Initial Calculation Run on Page Load
  calculateExpeditionCost();

  // --- Modal Alert Close Functionality ---
  function hideModal() {
    alertModal.classList.add('hidden');
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', hideModal);

  // Close on background overlay click
  if (alertModal) {
    alertModal.addEventListener('click', (e) => {
      if (e.target === alertModal) hideModal();
    });
  }

  // --- Single Unified Form Submit Handler (Triggers Center Alert) ---
  expeditionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedDest = destSelect.options[destSelect.selectedIndex].text;
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    const selectedTier = packageTier.options[packageTier.selectedIndex].text;
    const days = tripDays.value;
    const climbers = climberCount.value;
    const totalCost = liveBudget.textContent;

    // Set Centered Alert Content Inside Modal
    modalBody.innerHTML = `
      <h3>🎉 Expedition Plan Generated!</h3>
      <div><strong>⛰️ Trail & Difficulty:</strong> ${selectedDest} (${selectedDifficulty} Grade)</div>
      <div><strong>📅 Duration & Size:</strong> ${days} Days Journey for ${climbers} Climber(s)</div>
      <div><strong>🏕️ Package Tier:</strong> ${selectedTier}</div>
      <div><strong>💳 Budget Estimate:</strong> <span style="color:#00b4d8; font-weight:800; font-size:1.05rem;">$${totalCost}</span></div>
    `;

    // Display Modal Alert in Center of Screen
    alertModal.classList.remove('hidden');
  });
});

/* ==========================================================================
            ------------ LIVE TRAIL & WEATHER ALERT CARD start --------------
   ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '71b12b591b9201a1c93a02c918342469';
  const LAT = 35.3213; // Skardu / Karakoram Coordinates
  const LON = 75.5501;

  async function fetchLiveWeather() {
    const liveTemp = document.getElementById('liveTemp');
    const liveCondition = document.getElementById('liveCondition');
    const liveWind = document.getElementById('liveWind');
    const liveSafety = document.getElementById('liveSafety');
    const updateTime = document.getElementById('updateTime');
    const safetyCardBox = document.getElementById('safetyCardBox');
    const safetyBarFill = document.getElementById('safetyBarFill');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();

      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].description;
      const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h

      liveTemp.textContent = `${temp}°C`;
      liveCondition.textContent = condition;
      liveWind.textContent = `Wind speed: ~${windSpeed} km/h`;

      // Reset classes
      safetyCardBox.classList.remove('safety-warning', 'safety-danger', 'safety-good');

      // Wind Assessment Logic
      if (windSpeed > 35) {
        liveSafety.textContent = 'High Wind Warning';
        liveSafety.style.color = '#ef4444';
        safetyCardBox.classList.add('safety-danger');
        safetyBarFill.style.width = '90%';
      } else if (windSpeed > 20) {
        liveSafety.textContent = 'Moderate Wind Advisory';
        liveSafety.style.color = '#fbbf24';
        safetyCardBox.classList.add('safety-warning');
        safetyBarFill.style.width = '65%';
      } else {
        liveSafety.textContent = 'Safe Trail Conditions';
        liveSafety.style.color = '#10b981';
        safetyCardBox.classList.add('safety-good');
        safetyBarFill.style.width = '30%';
      }

      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      updateTime.textContent = `Live at ${currentTime}`;

    } catch (error) {
      console.error('Weather Fetch Error:', error);
      liveTemp.textContent = '-2°C';
      liveCondition.textContent = 'Clear / Light Snow';
      liveWind.textContent = 'Wind speed: ~24 km/h';
      liveSafety.textContent = 'Moderate Wind Advisory';
      liveSafety.style.color = '#fbbf24';
      updateTime.textContent = 'Offline Mode';
    }
  }

  fetchLiveWeather();
  setInterval(fetchLiveWeather, 600000); // 10 Min Interval
});

 /* ==========================================================================
                MOUNTAIN EXPENSE ESTIMATOR SECTION start 
   ========================================================================== */
   document.addEventListener('DOMContentLoaded', () => {
  const currBtns = document.querySelectorAll('.curr-btn');
  const expenseAmounts = document.querySelectorAll('.expense-amount');
  const grandTotalDisplay = document.getElementById('grandTotal');

  // USD to PKR Exchange Rate (Approx 1 USD = 278 PKR)
  const USD_TO_PKR = 278;
  let currentCurrency = 'USD';

  // Function to Recalculate & Display Costs
  function updatePrices() {
    let grandTotal = 0;

    expenseAmounts.forEach(elem => {
      const baseUSD = parseFloat(elem.dataset.base);
      
      if (currentCurrency === 'USD') {
        elem.textContent = `$${baseUSD.toLocaleString()}`;
        grandTotal += baseUSD;
      } else {
        const basePKR = Math.round(baseUSD * USD_TO_PKR);
        elem.textContent = `Rs ${basePKR.toLocaleString()}`;
        grandTotal += basePKR;
      }
    });

    // Update Grand Total Display
    if (currentCurrency === 'USD') {
      grandTotalDisplay.textContent = `$${grandTotal.toLocaleString()}`;
    } else {
      grandTotalDisplay.textContent = `Rs ${grandTotal.toLocaleString()}`;
    }
  }

  // Currency Switch Listener
  currBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      currentCurrency = e.target.dataset.curr;
      updatePrices();
    });
  });

  // Initial Calculation Run
  updatePrices();
});
/* ==========================================================================
                 ESSENTIAL MOUNTAIN GEAR CHECKLIST start 
   ========================================================================== */document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.gear-check');
  const counterDisplay = document.getElementById('checklistCounter');
  const progressBarFill = document.getElementById('checklistProgressBar');

  function updateChecklistProgress() {
    const totalItems = checkboxes.length;
    const checkedItems = document.querySelectorAll('.gear-check:checked').length;
    const percentage = Math.round((checkedItems / totalItems) * 100);

    // Update Counter Text
    counterDisplay.textContent = `${checkedItems} / ${totalItems} Packed`;

    // Update Progress Bar
    progressBarFill.style.width = `${percentage}%`;
  }

  // Attach event listener to every checkbox
  checkboxes.forEach(chk => {
    chk.addEventListener('change', updateChecklistProgress);
  });

  // Initial calculation on page load
  updateChecklistProgress();
});