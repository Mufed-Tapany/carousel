(function () {
    const carousel = document.getElementById("carousel");
    // query kitties FROM the carousel (maybe multiple carousels in the future)
    const kitties = carousel.querySelectorAll(".kitty");
    const dots = carousel.querySelectorAll(".dot");
    let delay = 5000;
    let kittiesIndex = 0;
    let kittiesNext = 1;
    var timer; // to save setTimeout inside of it
    let animating; // to set the current animation status .. true or false
    let distanceToSwipe = 200; // the minimum distance to swipe
    var swippingX = {
        startX: null,
        endX: null,
    };

    const moveKitties = () => {
        // set the animation to true
        animating = true;
        // remove onscreen class from the kitties[0] and add exit class to it
        kitties[kittiesIndex].classList.remove("onscreen");
        kitties[kittiesIndex].classList.add("exit");
        // add onscreen class to kitties[1]
        kitties[kittiesNext].classList.add("onscreen");

        kittiesIndex = kittiesNext;

        if (kittiesIndex === kitties.length - 1) {
            kittiesNext = 0;
        } else {
            kittiesNext++;
        }
    };

    // adding transition eventListener
    carousel.addEventListener("transitionend", (event) => {
        if (!event.target.classList.contains("exit")) {
            return;
        }
        animating = false;
        event.target.classList.remove("exit");
        //save the setTimeout in a variable, because we will need to clearTimeout later
        timer = setTimeout(function () {
            moveKitties();
            updateDots();
        }, delay);
    });

    // adding highlight for each dot
    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle("highlight", kittiesIndex === index);
        });
    };

    const dotsHandler = (event, index) => {
        // if the user clicks a dot for a picture that it's alredy on the screen ... do nothing
        if (event.target.classList.contains("highlight")) {
            return;
        }
        // if the user click a dot while an animation is happening ... do nothing
        if (animating) {
            return;
        }
        // stop the setTimeOut
        clearTimeout(timer);
        // add highlight class to the clicked dot
        // and set the next kitty index to the current dot index
        event.target.classList.toggle("highlight", (kittiesNext = index));
        // check the next kitty index in the console
        console.log(kittiesNext);
        // then call the moveKitties and updateDots functions again
        moveKitties();
        updateDots();
    };

    const getDotsHandler = (event, index) => {
        dotsHandler(event, index);
        event.stopPropagation();
    };

    // loop over the dots
    const clickTouchDotsHandler = () => {
        for (let i = 0; i < dots.length; i++) {
            // adding click eventListener for each dot
            dots[i].addEventListener("click", (event) => {
                getDotsHandler(event, i);
            });
            dots[i].addEventListener("touchstart", (event) => {
                getDotsHandler(event, i);
            });
        }
    };

    const touchStart = (event) => {
        swippingX.startX = event.touches[0].pageX;
    };

    const touchMove = (event) => {
        swippingX.endX = event.touches[0].pageX;
    };

    const touchEnd = () => {
        distanceSwipped = swippingX.startX - swippingX.endX;
        if (distanceSwipped > distanceToSwipe) {
            clearTimeout(timer);
            if (animating) {
                return;
            }
            moveKitties();
            updateDots();
        }
    };

    carousel.addEventListener("touchstart", touchStart, false);
    carousel.addEventListener("touchmove", touchMove, false);
    carousel.addEventListener("touchend", touchEnd, false);

    clickTouchDotsHandler();

    //save the setTimeout in a variable, because we will need to clearTimeout later
    timer = setTimeout(function () {
        moveKitties();
        updateDots();
    }, delay);
})();
