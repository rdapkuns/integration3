
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const sectionPrint = document.querySelector(".printing")


const videoScrub = (video, vars) => {
    video = gsap.utils.toArray(video)[0]; // In case selector text is fed in.

    const once = (el, event, fn) => {
        const onceFn = function () {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn);
        return onceFn;
    };

    const prepFunc = () => { video.play(); video.pause(); };
    const prep = () => once(document.documentElement, "touchstart", prepFunc);

    const tween = gsap.to(video, {
        currentTime: video.duration || 1,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
            ...vars.scrollTrigger,
            onUpdate: self => {
                const progress = self.progress;
                video.currentTime = progress * video.duration;
            }
        }
    });

    prep();
    video.readyState ? null : once(video, "loadedmetadata", () => tween.invalidate());
    return tween;
};


gsap.utils.toArray(".press__anim").forEach(video => {
    const parent = video.parentElement; 

    videoScrub(video, {
        scrollTrigger: {
            trigger: sectionPrint, 
            start: "+=50",
            end: "+=3000",
            
            scrub: true,
            
            pin: true, 
            
        }
    });
});


const swapPressText = () => {
    const paragraph1 = document.querySelector(".printing_paragraph-1");
    const paragraph2 = document.querySelector(".printing_paragraph-2");
    const paragraph3 = document.querySelector(".printing_paragraph-3");

    const tl1 = gsap.timeline({ paused: true });
    const tl2 = gsap.timeline({ paused: true });
    const tl3 = gsap.timeline({ paused: true });

    tl1
        .to(paragraph1, {
            y: "-200%",
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
        })
        .from(paragraph2, {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
        }, "-=0.6");

    tl2
        .to(paragraph2, {
            y: "-200%",
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
        })
        .from(paragraph3, {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
        }, "-=0.6");

    tl3
        .to(paragraph3, {
            y: "-200%",
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
        });

    let lastProgress = 0;

    ScrollTrigger.create({
        trigger: sectionPrint,
        start: "+=50",
        end: "+=3000",
        onUpdate: self => {
            const progress = self.progress;
            const scrollingForward = progress > lastProgress;

            if (scrollingForward) {
                if (progress >= 0.3 && !tl1.isActive()) {
                    if (!tl1.progress()) {
                        tl1.play();
                    }
                }

                if (progress >= 0.6 && !tl2.isActive()) {
                    if (!tl2.progress()) {
                        tl2.play();
                    }
                }
            }
            else {


                if (progress <= 0.6 && !tl2.isActive()) {
                    if (tl2.progress() === 1) {
                        tl2.reverse();
                    }
                }
                if (progress <= 0.3 && !tl1.isActive()) {
                    if (tl1.progress() === 1) {
                        tl1.reverse();
                    }
                }
            }
            lastProgress = progress;
        }
    });
};

const distBook1 = document.querySelector(".dist__book1")
const distBook2 = document.querySelector(".dist__book2")
const distBook3 = document.querySelector(".dist__book3")
const distBook4 = document.querySelector(".dist__book4")


const distributeBooks = () => {
    let timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".distribution",
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: true,
            // markers: true
        }
    });

    timeline
        .to(distBook1, {
            x: "+300%",
            ease: "power2.inOut",
        }, "+=0.2")
        .to(".dist__paragraph1", {
            x: "+200%",
            opacity: 0,
            ease: "power2.inOut",
        }, "<")
        .from(distBook2, {
            y: "100%",
            // opacity: 0,
            ease: "power2.out",
        }, "-=0.5")
        .from(".dist__paragraph2", {
            x: "-100%",
            opacity: 0,
            ease: "power2.inOut",
        }, "<")
        .to(distBook2, {
            x: "+300%",
            ease: "power2.inOut",
        }, "-=0.1")
        .to(".dist__paragraph2", {
            x: "+200%",
            opacity: 0,
            ease: "power2.inOut",
        }, "<")
        .from(distBook3, {
            y: "100%",
            ease: "power2.out",
        }, "-=0.5")
        .from(".dist__paragraph3", {
            x: "-100%",
            opacity: 0,
            ease: "power2.inOut",
        }, "<")
        .to(distBook3, {
            x: "+300%",
            ease: "power2.inOut",
        }, "-=0.1")
        .to(".dist__paragraph3", {
            x: "+200%",
            opacity: 0,
            ease: "power2.inOut",
        }, "<")
        .from(distBook4, {
            y: "100%",
            ease: "power2.out",
        }, "-=0.5")
        .from(".dist__paragraph4", {
            x: "-100%",
            opacity: 0,
            ease: "power2.inOut",
        }, "<")
        .to(distBook4, {
            x: "+300%",
            ease: "power2.inOut",
        }, "-=0.1")

};


let mapAnimation;

const addMapWrapper = () => {
    mapAnimation = gsap.to(".map__wrapper", {
        ease: "none",
        y: "+500",
        scrollTrigger: {
            trigger: ".map__section",
            start: "top top",
            end: "+=500",
            scrub: true,
            // markers: true
        },
    });
}

const removeMapWrapper = () => {
    if (mapAnimation) {
        mapAnimation.kill();
        mapAnimation.scrollTrigger.kill();
        mapAnimation = null;
    }
}

let isWide = (window.innerWidth > 0 ? window.innerWidth : screen.width) > 960;


const checkScreenSize = () => {
    const wasWide = isWide;
    const currentWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    isWide = currentWidth > 960;

    if (wasWide !== isWide) {
        if (isWide) {
            // addSpecialCells(110, 14, 89, 92);
            removeMapWrapper()
        } else {
            // addSpecialCells(36, 6, 27, 33);
            console.log("is narrow")
            addMapWrapper()
        }
    }
}


const init = () => {
    distributeBooks()
    swapPressText()
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize);
    gsap.from(".progress-bar--fill", {

        ease: "none",
        transformOrigin: "top center",
        scaleY: 0,
        scrollTrigger: {
            trigger: ".printing",
            start: "top top",
            end: "+=3000",
            scrub: true,

            // markers: true,
            // pin: true,
        },
    });



}

init();
