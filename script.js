const subjectMap = {
  general: {
    email: "contact@kasiassur.fr",
    label: "Information g\u00E9n\u00E9rale"
  },
  gestion: {
    email: "gestion@kasiassur.fr",
    label: "Gestion de dossier"
  },
  reclamation: {
    email: "reclamation@kasiassur.fr",
    label: "Service r\u00E9clamation"
  }
};

const subjectSelect = document.querySelector("#contactSubject");
const destinationEmail = document.querySelector("#destinationEmail");
const form = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const channelCards = document.querySelectorAll(".channel-card");
const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateDestination(subject) {
  const destination = subjectMap[subject] ?? subjectMap.general;

  if (destinationEmail) {
    destinationEmail.textContent = destination.email;
  }

  channelCards.forEach((card) => {
    const isActive = card.dataset.subject === subject;
    card.classList.toggle("is-active", isActive);
  });
}

if (subjectSelect) {
  updateDestination(subjectSelect.value);

  subjectSelect.addEventListener("change", (event) => {
    updateDestination(event.target.value);
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";
    const subjectKey = formData.get("subject")?.toString() ?? "general";
    const destination = subjectMap[subjectKey] ?? subjectMap.general;

    const mailSubject = `KASIASSUR - ${destination.label}`;
    const mailBody = [
      "Bonjour,",
      "",
      `Je souhaite vous contacter au sujet de : ${destination.label}.`,
      "",
      `Nom et pr\u00E9nom : ${name}`,
      `E-mail : ${email}`,
      `T\u00E9l\u00E9phone : ${phone}`,
      "",
      "Message :",
      message || "A pr\u00E9ciser",
      "",
      "Merci pour votre retour.",
      "",
      "Cordialement"
    ].join("\n");

    const mailtoUrl = `mailto:${destination.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    if (formStatus) {
      formStatus.textContent = `Votre demande est orient\u00E9e vers ${destination.label} (${destination.email}). Ouverture de votre messagerie...`;
    }

    window.location.href = mailtoUrl;
  });
}

if (revealItems.length > 0) {
  if (reducedMotion.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}
