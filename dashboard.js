// Custom Animated Cursor Movement
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = (e.clientX - 12) + 'px';
    follower.style.top = (e.clientY - 12) + 'px';
});

// Interactive Calendar Day Selection
const calDays = document.querySelectorAll('.cal-day:not(.head):not(.empty)');
calDays.forEach(day => {
    day.addEventListener('click', () => {
        calDays.forEach(d => d.classList.remove('active-gold'));
        day.classList.add('active-gold');
    });
});

// Dynamic Circular Progress Ring Calculation
document.querySelectorAll('.circle-card').forEach(card => {
    const circle = card.querySelector('.progress-ring-circle');
    const percentText = card.querySelector('.percentage').innerText;
    const percentage = parseInt(percentText);
    
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
});