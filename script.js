document.addEventListener("DOMContentLoaded", () => {
    
    /** Smooth Scrolling **/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });

    /** Contact Form Validation **/
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            
            const fields = {
                name: document.querySelector('input[placeholder="Your Name"]'),
                email: document.querySelector('input[placeholder="Your Email"]'),
                subject: document.querySelector('input[placeholder="Subject"]'),
                message: document.querySelector("textarea")
            };
            
            clearErrors();
            let isValid = true;
            
            if (!fields.name.value.trim()) {
                showError(fields.name, "Name is required");
                isValid = false;
            }
            if (!validateEmail(fields.email.value.trim())) {
                showError(fields.email, "Enter a valid email");
                isValid = false;
            }
            if (!fields.subject.value.trim()) {
                showError(fields.subject, "Subject cannot be empty");
                isValid = false;
            }
            if (!fields.message.value.trim()) {
                showError(fields.message, "Message cannot be empty");
                isValid = false;
            }
            
            if (isValid) {
                alert("Message sent successfully!");
                form.reset();
            }
        });
    }

    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const showError = (input, message) => {
        const error = document.createElement("p");
        error.classList.add("error-message");
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.classList.add("error-input");
    };
    
    const clearErrors = () => {
        document.querySelectorAll(".error-message").forEach(error => error.remove());
        document.querySelectorAll(".error-input").forEach(input => input.classList.remove("error-input"));
    };

    /** Active Link Highlighting **/
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    });
});
