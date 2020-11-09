
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "85%", duration: 3 , stagger: 0.30, ease: "bounce.out"});
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".landing", {width: "0%", height: "0%" , duration: 0 }, "-=1");

