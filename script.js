/* =========================================================
   NOVA DENTAL
   Interactive JavaScript
========================================================= */


/* ================= NAVBAR ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .about-content, .dentist-card, .appointment-box, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ================= STAGGER SERVICE CARDS ================= */

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.08}s`;

});


/* ================= STAGGER DENTISTS ================= */

const dentistCards = document.querySelectorAll(".dentist-card");

dentistCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.1}s`;

});


/* ================= ANIMATED COUNTERS ================= */

const counters = document.querySelectorAll(".hero-trust strong");

let countersStarted = false;


function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach((counter) => {

        const originalText =
            counter.textContent.trim();

        const number =
            parseFloat(originalText);

        const suffix =
            originalText.replace(
                number.toString(),
                ""
            );

        let current = 0;

        const duration = 1300;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) / duration,
                    1
                );


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                number * eased;


            if (originalText.includes(".")) {

                counter.textContent =
                    current.toFixed(1) + suffix;

            } else {

                counter.textContent =
                    Math.floor(current) + suffix;

            }


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    originalText;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}


const trustSection =
    document.querySelector(".hero-trust");


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            if (entries[0].isIntersecting) {

                animateCounters();

                observer.disconnect();

            }

        },
        {
            threshold: 0.5
        }
    );


if (trustSection) {
    counterObserver.observe(trustSection);
}


/* ================= APPOINTMENT FORM ================= */

const appointmentForm =
    document.querySelector("#appointmentForm");


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const button =
                appointmentForm.querySelector(
                    "button"
                );


            const originalText =
                button.textContent;


            button.textContent =
                "Request Sent ✓";


            button.disabled = true;


            button.style.background =
                "#16a34a";


            setTimeout(() => {

                button.textContent =
                    originalText;

                button.disabled =
                    false;

                button.style.background =
                    "";

                appointmentForm.reset();

            }, 3000);

        }
    );

}


/* ================= PARALLAX HERO ================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / 60;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / 60;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        if (
            window.scrollY >=
            sectionTop
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* ================= PAGE LOAD ================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

