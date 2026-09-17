import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Booking Save karne ke liye
async function saveBooking() {
  let name = document.getElementById("name").value;
  let place = document.getElementById("place").value;
  let date = document.getElementById("date").value;

  await addDoc(collection(db, "bookings"), {
    name: name,
    place: place,
    date: date
  });
  alert("Booking save ho gayi! Firebase me check karo");
}

// Booking dikhane ke liye dashboard pe
async function showBookings() {
  const querySnapshot = await getDocs(collection(db, "bookings"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

// Authentication check
onAuthStateChanged(auth, (user) => {
    const userInfoName = document.querySelector('.user-info strong');
    const userAvatar = document.querySelector('.avatar');

    if (user) {
        const displayName = user.displayName || user.email.split('@')[0];
        if (userInfoName) userInfoName.innerText = displayName;
        if (userAvatar) userAvatar.innerText = displayName.substring(0, 2).toUpperCase();
        console.log("Authenticated user:", user.email);
    } else {
        console.log("No user currently logged in.");
    }
});

// Quick Booking Form Submission
const bookingForm = document.querySelector('.quick-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('.btn-submit-booking');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Saving...";
        submitBtn.disabled = true;

        const clientName = bookingForm.querySelectorAll('input')[0].value;
        const destination = bookingForm.querySelector('select').value;
        const date = bookingForm.querySelector('input[type="date"]').value;
        const timeSlot = bookingForm.querySelectorAll('select')[1].value;

        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                clientName: clientName,
                destination: destination,
                date: date,
                timeSlot: timeSlot,
                status: "Pending",
                createdAt: serverTimestamp()
            });

            alert("Booking saved successfully! ID: " + docRef.id);
            bookingForm.reset();
            fetchRecentBookings();

        } catch (error) {
            console.error("Error saving booking: ", error);
            alert("Error saving booking: " + error.message);
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Fetch Recent Bookings
async function fetchRecentBookings() {
    const tableBody = document.querySelector('table tbody');
    if (!tableBody) return;

    try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        
        if (!querySnapshot.empty) {
            tableBody.innerHTML = "";

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = document.createElement('tr');
                const statusClass = data.status && data.status.toLowerCase() === 'confirmed' ? 'confirmed' : 'pending';

                row.innerHTML = `
                    <td>#${doc.id.substring(0, 6).toUpperCase()}</td>
                    <td>${data.clientName || 'N/A'}</td>
                    <td>${data.destination || 'N/A'}</td>
                    <td>${data.date || 'N/A'}</td>
                    <td><span class="status ${statusClass}">${data.status || 'Pending'}</span></td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching bookings: ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRecentBookings();
});

// UI Interactions
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = (e.clientX - 12) + 'px';
        follower.style.top = (e.clientY - 12) + 'px';
    });
}

const calDays = document.querySelectorAll('.cal-day:not(.head):not(.empty)');
calDays.forEach(day => {
    day.addEventListener('click', () => {
        calDays.forEach(d => d.classList.remove('active-gold'));
        day.classList.add('active-gold');
    });
});

document.querySelectorAll('.circle-card').forEach(card => {
    const circle = card.querySelector('.progress-ring-circle');
    const percentText = card.querySelector('.percentage')?.innerText;
    
    if (circle && percentText) {
        const percentage = parseInt(percentText);
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
});