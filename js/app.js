/*=========================================
        Premium Mobile Navbar
=========================================*/

const menuBtn = document.querySelector(".tv-menu-btn");
const navMenu = document.querySelector(".tv-nav-menu");
const header = document.querySelector(".tv-header");

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");

});

window.addEventListener("scroll", () => {

    header.classList.toggle("scrolled", window.scrollY > 50);

});

// Close menu after clicking a link

document.querySelectorAll(".tv-nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");

    });

});

// Close menu when clicking outside

document.addEventListener("click", (e) => {

    if (!header.contains(e.target)) {

        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");

    }

});
////////////////////////////////////navbar//////////

/*=========================================
      Premium Hero Text Animation
=========================================*/

const heroData = [

{
title:"Discover The Beauty Of Pakistan",

text:"Explore breathtaking mountains, crystal lakes and unforgettable adventures with TravelVist."

},

{
title:"Adventure Starts With TravelVist",

text:"Book premium tours and enjoy luxury travel experiences with your family and friends."

},

{
title:"Explore Every Destination",

text:"From Hunza to Skardu, create memories that last forever with our travel experts."

}

];

const heroTitle=document.getElementById("heroTitle");
const heroText=document.getElementById("heroText");

let heroIndex=0;

function changeHero(){

heroTitle.style.opacity="0";
heroText.style.opacity="0";

setTimeout(()=>{

heroIndex=(heroIndex+1)%heroData.length;

heroTitle.innerHTML=heroData[heroIndex].title;
heroText.innerHTML=heroData[heroIndex].text;

heroTitle.style.opacity="1";
heroText.style.opacity="1";

},500);

}

setInterval(changeHero,5000);
//////////////////////////////////////hero //////////

/*=========================================
      Search Button Animation
=========================================*/

const tvSearchBtn = document.querySelector(".tv-search-card button");

if (tvSearchBtn) {

    tvSearchBtn.addEventListener("click", function (e) {

        e.preventDefault();

        this.innerHTML = "Searching...";

        this.style.background = "#0f172a";

        setTimeout(() => {

            this.innerHTML = "Search Tours";

            this.style.background = "#00b894";

        }, 1800);

    });

}

/*=========================================
      Scroll Reveal Animation
=========================================*/

const tvObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("tv-show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".tv-left,.tv-search-card").forEach((el) => {
    tvObserver.observe(el);
});

/*=========================================
      Smooth Scroll (Optional)
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


//////////////////////////////////////////faq ///////////////
/*==================================
      TravelVist FAQ Accordion
==================================*/

const faqItems = document.querySelectorAll(".tv-faq-item");

faqItems.forEach((item)=>{

    const question = item.querySelector(".tv-faq-question");

    question.addEventListener("click",()=>{

        faqItems.forEach((faq)=>{

            if(faq !== item){
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});