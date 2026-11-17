
/* ==============================
   MAKAMU INCORPORATED
   JAVASCRIPT
================================ */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});


// CLOSE MENU WHEN LINK IS CLICKED

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// HEADER SCROLL EFFECT

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});


// REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
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

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ACTIVE NAVIGATION ON SCROLL

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove("active");

          if (
            link.getAttribute("href") ===
            `#${entry.target.id}`
          ) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// CONTACT FORM - WHATSAPP INTEGRATION

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(event) {

  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const submitButton = contactForm.querySelector(
    ".submit-btn"
  );

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !email || !service || !message) {
    formStatus.textContent = "Please complete all required fields.";
    formStatus.className = "form-status error";
    return;
  }

  const whatsappMessage = `
NEW LEGAL ENQUIRY
-------------------------

Full Name: ${name}

Phone Number: ${phone}

Email: ${email}

Legal Service: ${service}

Enquiry:
${message}

-------------------------
Sent through the Makamu Incorporated website.
  `.trim();

  const whatsappNumber = "27818473455";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${
      encodeURIComponent(whatsappMessage)
    }`;

  submitButton.disabled = true;
  submitButton.textContent = "Opening WhatsApp...";

  formStatus.textContent =
    "Please send your prepared enquiry in WhatsApp.";

  formStatus.className = "form-status success";

  const whatsappWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  if (!whatsappWindow) {
    formStatus.textContent =
      "WhatsApp could not open automatically. Please allow pop-ups and try again.";

    formStatus.className = "form-status error";
  }

  submitButton.disabled = false;
  submitButton.innerHTML = 'Send Enquiry <span>↗</span>';

});


// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", event => {

  const clickedInsideMenu =
    navLinks.contains(event.target);

  const clickedToggle =
    menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

});
