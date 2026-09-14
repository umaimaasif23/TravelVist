
document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".tv-beach-slide");

    const nextBtn = document.querySelector(".tv-beach-next");
    const prevBtn = document.querySelector(".tv-beach-prev");

    const currentSlide =
        document.querySelector(".tv-current-slide");

    const progress =
        document.querySelector(".tv-beach-progress span");


    let currentIndex = 0;

    let slideTimer;

    const slideDuration = 6000;


    /*================================================
                SHOW SLIDE
    =================================================*/

    function showSlide(index) {

        /* Remove active from all */

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        /* Keep index inside range */

        if (index >= slides.length) {
            currentIndex = 0;
        }

        if (index < 0) {
            currentIndex = slides.length - 1;
        }


        /* Activate selected slide */

        slides[currentIndex].classList.add("active");


        /* Update counter */

        currentSlide.textContent =
            String(currentIndex + 1).padStart(2, "0");


        /* Restart progress */

        restartProgress();


        /* Restart automatic slider */

        restartTimer();
    }


    /*================================================
                NEXT SLIDE
    =================================================*/

    function nextSlide() {

        currentIndex++;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        showSlide(currentIndex);
    }


    /*================================================
                PREVIOUS SLIDE
    =================================================*/

    function previousSlide() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        showSlide(currentIndex);
    }


    /*================================================
                NEXT BUTTON
    =================================================*/

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {

            nextSlide();

        });

    }


    /*================================================
                PREVIOUS BUTTON
    =================================================*/

    if (prevBtn) {

        prevBtn.addEventListener("click", function () {

            previousSlide();

        });

    }


    /*================================================
                PROGRESS BAR
    =================================================*/

    function restartProgress() {

        if (!progress) return;


        /* Remove animation */

        progress.classList.remove("animate");


        /*
            Force browser reflow.
            This makes the animation restart
            every time the slide changes.
        */

        void progress.offsetWidth;


        /* Start animation */

        progress.classList.add("animate");
    }


    /*================================================
                AUTO SLIDER
    =================================================*/

    function startTimer() {

        slideTimer = setInterval(function () {

            nextSlide();

        }, slideDuration);

    }


    function restartTimer() {

        clearInterval(slideTimer);

        startTimer();

    }


    /*================================================
                PAUSE ON HOVER
    =================================================*/

    const hero =
        document.querySelector(".tv-beach-hero");


    if (hero) {

        hero.addEventListener("mouseenter", function () {

            clearInterval(slideTimer);

        });


        hero.addEventListener("mouseleave", function () {

            restartTimer();

        });

    }


    /*================================================
                KEYBOARD CONTROLS
    =================================================*/

    document.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {

            nextSlide();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();

        }

    });


    /*================================================
                TOUCH / SWIPE
    =================================================*/

    let touchStartX = 0;

    let touchEndX = 0;


    if (hero) {

        hero.addEventListener("touchstart", function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        });


        hero.addEventListener("touchend", function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        });

    }


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Swipe left */

        if (swipeDistance < -50) {

            nextSlide();

        }


        /* Swipe right */

        if (swipeDistance > 50) {

            previousSlide();

        }

    }


    /*================================================
                INITIALIZE
    =================================================*/

    showSlide(0);

});
/////////////////////////////////////////////////navbar end////
// //////////////////////////////////////////////side bar start
/* =========================================
   TRAVELVIST - COAST SECTION REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const coastElements = document.querySelectorAll(
        ".tv-coast-heading, .tv-coast-story"
    );

    if (!coastElements.length) return;

    const coastObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("tv-coast-visible");
                    coastObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    coastElements.forEach(function (element) {
        coastObserver.observe(element);
    });

});
////////////////////////////////////side bar end/////
////////////////////////////////////////last bar start//
/* =========================================
   TRAVELVIST - CINEMATIC OCEAN VIDEO
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const video = document.querySelector(".tv-ocean-video");
    const playButton = document.querySelector(".tv-ocean-play");
    const muteButton = document.querySelector(".tv-ocean-mute");
    const progress = document.querySelector(".tv-ocean-progress");
    const progressBar = document.querySelector(".tv-ocean-progress span");

    const currentTime = document.querySelector(".tv-ocean-time");
    const duration = document.querySelector(".tv-ocean-duration");

    if (!video) return;


    /* ==============================
       FORMAT TIME
    =============================== */

    function formatTime(time) {

        if (isNaN(time)) return "00:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0")
        );
    }


    /* ==============================
       PLAY / PAUSE
    =============================== */

    function toggleVideo() {

        if (video.paused) {

            video.play();

            playButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            playButton.setAttribute(
                "aria-label",
                "Pause video"
            );

        } else {

            video.pause();

            playButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            playButton.setAttribute(
                "aria-label",
                "Play video"
            );
        }
    }


    playButton.addEventListener("click", toggleVideo);


    /* ==============================
       VIDEO CLICK
    =============================== */

    video.addEventListener("click", toggleVideo);


    /* ==============================
       MUTE / UNMUTE
    =============================== */

    muteButton.addEventListener("click", function () {

        video.muted = !video.muted;

        if (video.muted) {

            muteButton.innerHTML =
                '<i class="fa-solid fa-volume-xmark"></i>';

            muteButton.setAttribute(
                "aria-label",
                "Unmute video"
            );

        } else {

            muteButton.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

            muteButton.setAttribute(
                "aria-label",
                "Mute video"
            );
        }
    });


    /* ==============================
       PROGRESS UPDATE
    =============================== */

    video.addEventListener("timeupdate", function () {

        if (!video.duration) return;

        const percentage =
            (video.currentTime / video.duration) * 100;

        progressBar.style.width = percentage + "%";

        currentTime.textContent =
            formatTime(video.currentTime);
    });


    /* ==============================
       VIDEO DURATION
    =============================== */

    video.addEventListener("loadedmetadata", function () {

        duration.textContent =
            formatTime(video.duration);

    });


    /* ==============================
       CLICK PROGRESS BAR
    =============================== */

    progress.addEventListener("click", function (event) {

        if (!video.duration) return;

        const rect = progress.getBoundingClientRect();

        const clickPosition =
            event.clientX - rect.left;

        const percentage =
            clickPosition / rect.width;

        video.currentTime =
            percentage * video.duration;

    });


    /* ==============================
       VIDEO ENDED
    =============================== */

    video.addEventListener("play", function () {

        playButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    });


    video.addEventListener("pause", function () {

        playButton.innerHTML =
            '<i class="fa-solid fa-play"></i>';

    });

});
//////////////////////////////////////////last bar end