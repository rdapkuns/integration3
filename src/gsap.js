
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
/* The encoding is super important here to enable frame-by-frame scrubbing. */
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4


const sectionPrint = document.querySelector(".printing")

// const videoScrub = (video, vars) => {
//     video = gsap.utils.toArray(video)[0]; // in case selector text is fed in.
//     let once = (el, event, fn) => {
//         let onceFn = function () {
//             el.removeEventListener(event, onceFn);
//             fn.apply(this, arguments);
//         };
//         el.addEventListener(event, onceFn);
//         return onceFn;
//     },
//         prepFunc = () => { video.play(); video.pause(); },
//         prep = () => once(document.documentElement, "touchstart", prepFunc),
//         src = video.currentSrc || video.src,
//         tween = gsap.fromTo(video, { currentTime: 0 }, { paused: true, immediateRender: false, currentTime: video.duration || 1, ease: "none", ...vars }),
//         resetTime = () => (tween.vars.currentTime = video.duration || 1) && tween.invalidate();
//     prep();
//     video.readyState ? resetTime() : once(video, "loadedmetadata", resetTime);
//     return tween;
// }

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
                // Smoothly update the video frame on every scroll update
                const progress = self.progress; // Progress of the ScrollTrigger (0 to 1)
                video.currentTime = progress * video.duration;
            }
        }
    });

    prep();
    video.readyState ? null : once(video, "loadedmetadata", () => tween.invalidate());
    return tween;
};


gsap.utils.toArray(".press__anim").forEach(video => {
    const parent = video.parentElement; // Get the parent container of the video
    // let lastFrame = 0;
    // const onUpdate = (self) => {
    //     const frame = Math.floor(self.progress * video.duration * 60); // Calculate the current frame (assuming 60fps)
    //     if (frame !== lastFrame) {
    //         video.currentTime = self.progress * video.duration; // Update only if on a new frame
    //         lastFrame = frame;
    //     }
    // };
    // let totalLoops = 4; // Number of loops
    // const onUpdate = (self) => {
    //     if (video.readyState >= 1 && video.duration) {
    //         const progress = self.progress * totalLoops; // Map scroll progress to total loops
    //         const loopTime = progress % 1; // Keep progress within a single loop (0 to 1)
    //         video.currentTime = loopTime * video.duration; // Set the current time based on loop progress
    //     }
    // };

    videoScrub(video, {
        scrollTrigger: {
            trigger: sectionPrint, // Set the parent container as the trigger
            start: "+=50",
            end: "+=1000",
            // markers: true,
            scrub: true,
            // ease: Power2.easeOut,
            pin: true, // Pin the parent container
            // onUpdate: onUpdate,
        }
    });
});


// gsap.utils.toArray(".press__anim").forEach(video => videoScrub(video, {
//     scrollTrigger: {
//         trigger: sectionPrint,
//         start: "center center",
//         end: "+=600",
//         markers: true,
//         scrub: true,
//         pin: true
//     }
// }));

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
            markers: true
        }
    });

    // dist__paragraph1

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

// gsap.to(distBook2, {

//     ease: "none",
//     transformOrigin: "top center",
//     // scaleY: 0,
//     y: "+30%",
//     delay: 10,
//     ease: "power2.inOut",
//     scrollTrigger: {
//         trigger: ".distribution",
//         start: "top top",
//         end: "+=1000",
//         pin: true,
//         scrub: true,


//         // markers: true,
//         // pin: true,
//     },
// });
// }


const init = () => {
    distributeBooks()
    gsap.from(".progress-bar--fill", {

        ease: "none",
        transformOrigin: "top center",
        scaleY: 0,
        scrollTrigger: {
            trigger: ".printing",
            start: "top top",
            end: "+=1000",
            scrub: true,

            // markers: true,
            // pin: true,
        },
    });
}

init();
