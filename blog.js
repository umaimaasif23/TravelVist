   // HIGH-CONTRAST CUSTOM CURSOR
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = (e.clientX - 13) + 'px';
    follower.style.top = (e.clientY - 13) + 'px';
});

// 1. NOTEPAD VERTICAL FLIP LOGIC (Upward / Downward Flip)
const npPages = document.querySelectorAll('.np-page');
const npPrevBtn = document.getElementById('npPrevBtn');
const npNextBtn = document.getElementById('npNextBtn');
const npPageNum = document.getElementById('npPageNum');

let currentNpIndex = 0;

function updateNotepad() {
    npPages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === currentNpIndex) {
            page.classList.add('active');
        }
    });
    npPageNum.innerText = `Page ${currentNpIndex + 1} of ${npPages.length}`;
}

npNextBtn.addEventListener('click', () => {
    if (currentNpIndex < npPages.length - 1) {
        currentNpIndex++;
    } else {
        currentNpIndex = 0; // Loop back to start
    }
    updateNotepad();
});

npPrevBtn.addEventListener('click', () => {
    if (currentNpIndex > 0) {
        currentNpIndex--;
    } else {
        currentNpIndex = npPages.length - 1;
    }
    updateNotepad();
});

// 2. 3D REVOLVING CAROUSEL WHEEL LOGIC
const revolvingWheel = document.getElementById('revolvingWheel');
const spinLeft = document.getElementById('spinLeft');
const spinRight = document.getElementById('spinRight');

let wheelAngle = 0;

if (spinLeft && spinRight && revolvingWheel) {
    spinLeft.addEventListener('click', () => {
        wheelAngle += 60;
        revolvingWheel.style.transform = `rotateY(${wheelAngle}deg)`;
    });

    spinRight.addEventListener('click', () => {
        wheelAngle -= 60;
        revolvingWheel.style.transform = `rotateY(${wheelAngle}deg)`;
    });
}

// 3. STACKED DECK CARDS SHIFT LOGIC (One Behind Another)
const shiftDeckBtn = document.getElementById('shiftDeckBtn');
const stackDeck = document.getElementById('stackDeck');

if (shiftDeckBtn && stackDeck) {
    shiftDeckBtn.addEventListener('click', () => {
        const cards = stackDeck.querySelectorAll('.stack-card');
        if (cards.length > 0) {
            const topCard = cards[0];
            
            // Slide Top Card Down & Shift to back
            topCard.style.transform = 'translateY(150px) scale(0.8)';
            topCard.style.opacity = '0';

            setTimeout(() => {
                stackDeck.appendChild(topCard);
                
                // Re-assign Stack Order
                const updatedCards = stackDeck.querySelectorAll('.stack-card');
                updatedCards.forEach((card, index) => {
                    card.className = `stack-card card-${index + 1}`;
                    card.style.transform = '';
                    card.style.opacity = '';
                });
            }, 400);
        }
    });
}