(function () {
    console.log("Kitty carousel!");
    var carousel = document.getElementById("carousel");
    // query kitties FROM the carousel (maybe multiple carousels in the future)
    var kitties = carousel.querySelectorAll(".kitty");
    var dots = carousel.querySelectorAll(".dot");
    var delay = 5000;
    var kittiesIndex = 0;
    var kittiesNext = 1;
    var timer; // to save setTimeout inside of it
    var animating; // to set the current animation status .. true or false

    function moveKitties() {
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
    }

    // adding transition eventListener
    carousel.addEventListener("transitionend", function (event) {
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
    function updateDots() {
        dots.forEach(function (dot, index) {
            dot.classList.toggle("highlight", kittiesIndex === index);
        });
    }

    // adding click eventListener for each dot
    for (var i = 0; i < dots.length; i++) {
        // using IIFE to be sure that we get the index of the dot we are clickng, as long as we use var keyword to declare the i variable.
        (function (indx) {
            dots[i].addEventListener("click", function (event) {
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
                event.target.classList.toggle(
                    "highlight",
                    (kittiesNext = indx)
                );
                // check the next kitty index.. to be sure that the IIFE works
                console.log(kittiesNext);
                // then call the moveKitties nd updateDots functions again
                moveKitties();
                updateDots();
            });
        })(i);
    }

    // Another way to do that is using let keyword instead of var keyword (ES6) and there will be no need for IIFE ... like the following:

    /* for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", function (event) {
                if (event.target.classList.contains("highlight")) {
                    return;
                }
                if (animating) {
                    return;
                }
                clearTimeout(timer);
                event.target.classList.toggle("highlight", (kittiesNext = i));
                console.log(kittiesNext);
                clearTimeout(timer);
                moveKitties();
                updateDots();
            });
        } */

    //save the setTimeout in a variable, because we will need to clearTimeout later
    timer = setTimeout(function () {
        moveKitties();
        updateDots();
    }, delay);
})();
