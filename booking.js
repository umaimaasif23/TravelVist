// HIGH-CONTRAST CUSTOM CURSOR LOGIC
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = (e.clientX - 13) + 'px';
    follower.style.top = (e.clientY - 13) + 'px';
});

// MULTI-PAGE 3D OPENING BOOK LOGIC
const prevBtn = document.querySelector('#prevPageBtn');
const nextBtn = document.querySelector('#nextPageBtn');
const toggleBookBtn = document.querySelector('#toggleBookBtn');
const pageIndicator = document.querySelector('#pageIndicator');

const paper1 = document.querySelector('#p1');
const paper2 = document.querySelector('#p2');
const paper3 = document.querySelector('#p3');
const paper4 = document.querySelector('#p4');
const book = document.querySelector('#travelBook');

let currentLocation = 1;
const numOfPapers = 4;
const maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    toggleBookBtn.innerHTML = '<i class="fa-solid fa-book"></i> Close Travel Book';
}

function closeBook(isAtStart) {
    if(isAtStart) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    toggleBookBtn.innerHTML = '<i class="fa-solid fa-book-open"></i> Open Travel Book';
}

function updateIndicator() {
    if (currentLocation === 1) pageIndicator.innerText = "Cover Page";
    else if (currentLocation === 2) pageIndicator.innerText = "Page 1 - Paris";
    else if (currentLocation === 3) pageIndicator.innerText = "Page 2 & 3 - Dubai & Tokyo";
    else if (currentLocation === 4) pageIndicator.innerText = "Page 4 & 5 - Maldives & London";
    else if (currentLocation === 5) pageIndicator.innerText = "Page 6 - Bali & Back Cover";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                closeBook(false);
                break;
            default:
                break;
        }
        currentLocation++;
        updateIndicator();
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 4;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 3;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 2;
                break;
            case 5:
                openBook();
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 1;
                break;
            default:
                break;
        }
        currentLocation--;
        updateIndicator();
    }
}

nextBtn.addEventListener("click", goNextPage);
prevBtn.addEventListener("click", goPrevPage);

toggleBookBtn.addEventListener("click", () => {
    paper1.classList.remove("flipped");
    paper2.classList.remove("flipped");
    paper3.classList.remove("flipped");
    paper4.classList.remove("flipped");
    paper1.style.zIndex = 4;
    paper2.style.zIndex = 3;
    paper3.style.zIndex = 2;
    paper4.style.zIndex = 1;
    currentLocation = 1;
    closeBook(true);
    updateIndicator();
});

// SLIDER CAROUSEL LOGIC
const carouselTrack = document.getElementById('carouselTrack');
const slideNext = document.getElementById('slideNext');
const slidePrev = document.getElementById('slidePrev');

if(carouselTrack && slideNext && slidePrev) {
    slideNext.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: 300, behavior: 'smooth' });
    });
    slidePrev.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

// FORM SUBMISSION RESPONSE TOAST
const grandBookingForm = document.getElementById('grandBookingForm');
if (grandBookingForm) {
    grandBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const passengerName = grandBookingForm.querySelector('input[type="text"]').value;

        // Create Custom Toast Modal Response
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="
                position: fixed; top: 20px; right: 20px; background: #008080; color: white;
                padding: 20px 25px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                z-index: 100000; border-left: 6px solid #D4AF37; font-family: sans-serif;">
                <h3 style="margin:0 0 5px 0; color: #D4AF37;"><i class="fa-solid fa-circle-check"></i> VIP Ticket Generated!</h3>
                <p style="margin:0; font-size: 13px;">Congratulations <strong>${passengerName}</strong>! Your international travel booking has been confirmed with TravelVista.</p>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 4500);
        grandBookingForm.reset();
    });
}