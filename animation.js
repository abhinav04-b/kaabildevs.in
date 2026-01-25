document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 1. MOBILE GUARD CLAUSE
    // If screen is less than 721px, DO NOT RUN ANIMATIONS.
    // The CSS will handle the layout entirely.
    if (window.innerWidth <= 720) {
        
        // Simple Nav Click for Mobile (Just smooth scroll)
        document.querySelectorAll(".nav-link").forEach((btn) => {
            btn.onclick = (e) => {
                e.preventDefault();
                const ids = ["#hero", "#works", "#founders", "#contact"];
                const index = parseInt(btn.getAttribute("data-index"));
                const targetId = ids[index];
                
                // Native scroll is often more reliable on mobile than GSAP for basic stuff
                document.querySelector(targetId).scrollIntoView({ 
                    behavior: 'smooth' 
                });
            };
        });

        // STOP HERE. Do not run desktop code.
        return; 
    }

    // ==========================================================
    // DESKTOP CODE ONLY (Will not run on mobile)
    // ==========================================================
    
    // 1. SETUP: Prepare elements for the "Slide Over" effect
    gsap.set(["#works", "#founders", "#contact"], {
        xPercent: 100, 
        yPercent: 100, 
        autoAlpha: 1,
        position: "absolute",
        top: 0,
        left: 0
    });

    // 2. MASTER TIMELINE
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#main-wrapper",
            start: "top top",
            end: "+=400%", 
            scrub: 1,      
            pin: true,     
            anticipatePin: 1
        }
    });

    // OPEN CURTAINS
    tl.to("#m1", { yPercent: -100, ease: "none" })
      .to("#m2", { yPercent: 100, ease: "none" }, "<")
      .to("#w1", { xPercent: 20, ease: "none" }, "<") 
      .to("#w2", { xPercent: -20, ease: "none" }, "<");

    // SLIDE CONTENT
    tl.to("#works", { xPercent: 0, yPercent: 0, ease: "none" });
    tl.to("#founders", { xPercent: 0, yPercent: 0, ease: "none" });
    tl.to("#contact", { xPercent: 0, yPercent: 0, ease: "none" });

    // DESKTOP NAV CLICK
    document.querySelectorAll(".nav-link").forEach((btn) => {
        btn.onclick = (e) => {
            e.preventDefault();
            const index = parseInt(btn.getAttribute("data-index"));
            gsap.to(window, {
                scrollTo: { y: (index + 1) * window.innerHeight },
                duration: 1.5,
                ease: "power2.inOut"
            });
        };
    });
});