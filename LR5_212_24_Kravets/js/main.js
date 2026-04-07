$(document).ready(function () {

    console.log("JS CONNECTED ✅");

    const $menu = $(".menu");
    const $hiddenElements = $(".hidden");
    const $window = $(window);
    const $burger = $(".burger");

    $burger.click(function () {
        $menu.toggleClass("active");
        $(this).toggleClass("active");
    });

    $("a, .scroll-btn").click(function (e) {
        e.preventDefault();

        let target = $(this).attr("href") || $(this).data("target");

        if (target && $(target).length) {
            $("html, body").animate({
                scrollTop: $(target).offset().top - 70 
            }, 800);
        }

        $menu.removeClass("active");
        $burger.removeClass("active");
    });

    function animateOnScroll() {
        let windowBottom = $window.scrollTop() + $window.height();

        $hiddenElements.each(function () {
            let elementTop = $(this).offset().top;

            if (windowBottom > elementTop + 50) { 
                $(this).addClass("show");
            }
        });
    }

    $window.on("scroll", animateOnScroll);
    animateOnScroll(); 

    const $slides = $(".slides");
    const $slide = $(".slide");
    const slideCount = $slide.length;
    const slideWidth = $slide.outerWidth(); 
    let currentIndex = 0;

    setInterval(function () {
        currentIndex = (currentIndex + 1) % slideCount; 
        $slides.css("transform", `translateX(-${currentIndex * slideWidth}px)`);
    }, 2500);

});