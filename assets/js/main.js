/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

document.addEventListener('DOMContentLoaded', function () {
    const skills = [
        { name: "HMTL5", percentage: "90%", icon: "bxl-html5" }, // Ikon PHP diperbaiki
        { name: "CSS3", percentage: "90%", icon: "bxl-css3" },
        { name: "PHP", percentage: "90%", icon: "bxl-php" },
        { name: "UX/UI", percentage: "80%", icon: "bxs-paint" },
        { name: "React", percentage: "70%", icon: "bxl-react" },
        { name: "Node.js", percentage: "70%", icon: "bxl-nodejs" },
        { name: "Jquery", percentage: "65%", icon: "bxl-jquery" }, // Ikon Laravel juga diperbaiki
        { name: "JavaScript", percentage: "50%", icon: "bxl-javascript" }
        // Add more skills as needed
    ];


    const skillsList = document.querySelector('.skills__list');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentIndex = 0;
    const skillsPerPage = 4;

    function displaySkills() {
        skillsList.innerHTML = ''; // Clear previous skills
        const skillsToDisplay = skills.slice(currentIndex, currentIndex + skillsPerPage);

        skillsToDisplay.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('skills__data');

            skillElement.innerHTML = `
                <div class="skills__names">
                    <i class='bx ${skill.icon} skills__icon'></i>
                    <span class="skills__name">${skill.name}</span>
                </div>
                <div class="skills__bar" style="width: ${skill.percentage};"></div>
                <div>
                    <span class="skills__percentage">${skill.percentage}</span>
                </div>
            `;

            skillsList.appendChild(skillElement);
        });
    }

    function updateButtonStates() {
        if (currentIndex === 0) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }

        if (currentIndex + skillsPerPage >= skills.length) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }

    function slideSkills(direction) {
        // Calculate the slide distance
        const slideDistance = (direction === 'next' ? -100 : 100); // Adjust this value if needed
        skillsList.style.transform = `translateX(${slideDistance}%)`;

        setTimeout(() => {
            // Reset the transform property after the slide
            skillsList.style.transition = 'none'; // Disable transition temporarily
            displaySkills(); // Display new skills
            skillsList.style.transform = 'translateX(0)'; // Reset the transform
            skillsList.offsetHeight; // Trigger reflow
            skillsList.style.transition = 'transform 0.5s ease'; // Re-enable transition
        }, 500); // Delay to match the CSS transition duration
    }

    prevButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex -= skillsPerPage;
            slideSkills('prev'); // Slide to the left
            updateButtonStates(); // Update button states
        }
    });

    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentIndex + skillsPerPage < skills.length) {
            currentIndex += skillsPerPage;
            slideSkills('next'); // Slide to the right
            updateButtonStates(); // Update button states
        }
    });

    displaySkills(); // Initial display
    updateButtonStates(); // Update button states
});


function updateButtonStates() {
    if (currentIndex === 0) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }

    if (currentIndex + skillsPerPage >= skills.length) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

prevButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentIndex > 0) {
        currentIndex -= skillsPerPage;
        displaySkills();
        updateButtonStates(); // Update button states
    }
});

nextButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentIndex + skillsPerPage < skills.length) {
        currentIndex += skillsPerPage;
        displaySkills();
        updateButtonStates(); // Update button states
    }
});

displaySkills(); // Initial display
updateButtonStates(); // Update button states


sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 }); 

