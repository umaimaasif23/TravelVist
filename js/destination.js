


document.addEventListener("DOMContentLoaded", function(){

    const filterButtons =
        document.querySelectorAll(".tv-map-filter button");

    const pins =
        document.querySelectorAll(".tv-pin");


    filterButtons.forEach(button => {

        button.addEventListener("click", function(){

            /* Active Button */

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");


            /* Selected Category */

            const filter = this.dataset.filter;


            /* Show / Hide Pins */

            pins.forEach(pin => {

                const category = pin.dataset.category;


                if(filter === "all" || category === filter){

                    pin.style.opacity = "1";
                    pin.style.visibility = "visible";
                    pin.style.pointerEvents = "auto";

                }

                else{

                    pin.style.opacity = "0";
                    pin.style.visibility = "hidden";
                    pin.style.pointerEvents = "none";

                }

            });

        });

    });

});

