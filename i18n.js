(function () {
  const STORAGE_KEY = "kasiassur_language";
  const DEFAULT_LANGUAGE = "fr";
  const SUPPORTED_LANGUAGES = ["fr", "en", "es"];

  const translations = {
    fr: {
      common: {},
      index: {},
      legal: {},
      privacy: {}
    },
    en: {
      common: {
        "switcher.label": "Language switcher"
      },
      index: {},
      legal: {},
      privacy: {}
    },
    es: {
      common: {
        "switcher.label": "Selector de idioma"
      },
      index: {},
      legal: {},
      privacy: {}
    }
  };

  Object.assign(translations.fr.index, {
    "nav.clientSpace": "Parler a un conseiller",
    "footer.proof.badge": "Verification rapide",
    "footer.proof.desc": "Coordonnees directes et identifiants visibles pour verifier KASIASSUR en un coup d'oeil.",
    "footer.proof.phone": "Telephone",
    "footer.proof.orias": "ORIAS",
    "footer.proof.siren": "SIREN",
    "messages.nameRequired": "Veuillez renseigner votre nom et prenom.",
    "messages.emailRequired": "Veuillez renseigner votre adresse e-mail.",
    "messages.emailInvalid": "Format d'e-mail invalide. Exemple : nom@domaine.fr",
    "messages.phoneRequired": "Veuillez renseigner votre numero de telephone.",
    "messages.phoneInvalid": "Numero invalide. Utilisez un format tel que +33 6 12 34 56 78.",
    "messages.formInvalid": "Le formulaire contient des champs a corriger avant l'envoi.",
    "messages.submitPreparing": "Preparation...",
    "messages.submitReady": "Demande prete",
    "messages.formRouted": "Votre demande est en cours d'orientation vers {email}.",
    "messages.mailSubject": "KASIASSUR - {label}",
    "messages.mailGreeting": "Bonjour,",
    "messages.mailIntent": "Je souhaite vous contacter au sujet de : {label}.",
    "messages.mailName": "Nom et prenom : {value}",
    "messages.mailEmail": "E-mail : {value}",
    "messages.mailPhone": "Telephone : {value}",
    "messages.mailMessage": "Message :",
    "messages.mailSpecify": "A preciser",
    "messages.mailRegards": "Cordialement",
    "reviews.badge": "Avis clients",
    "reviews.title": "Des retours clients qui renforcent la confiance.",
    "reviews.desc": "Un service clair, un accompagnement serieux et un parcours simple : voici ce que retiennent nos clients.",
    "reviews.starsLabel": "5 etoiles sur 5",
    "reviews.review1.text": "Service rapide et professionnel. Tres bonne experience globale.",
    "reviews.review1.name": "Mohamed Benali",
    "reviews.review2.text": "Conseils clairs et accompagnement serieux du debut a la fin.",
    "reviews.review2.name": "Sarah Lemaire",
    "reviews.review3.text": "Processus simple, rapide et efficace. Je recommande.",
    "reviews.review3.name": "Yassine Kabbaj"
  });

  Object.assign(translations.en.index, {
    "meta.title": "KASIASSUR | Insurance broker in Paris for auto, home, health and business",
    "meta.description": "KASIASSUR, insurance broker in Paris, supports individuals and businesses across France for auto, home, health and business insurance. ORIAS 26004041.",
    "brand.tagline": "Your trusted partner",
    "nav.solutions": "Solutions",
    "nav.method": "Method",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.clientSpace": "Speak to an advisor",
    "hero.badge": "Digital insurance brokerage",
    "hero.title.1": "Protection",
    "hero.title.2": "with the",
    "hero.title.3": "precision",
    "hero.title.4": "of real",
    "hero.title.5": "advice.",
    "hero.copy": "KASIASSUR simplifies brokerage with a premium experience, human support and fully digital journeys. We help individuals and businesses choose clear auto, home, health and business insurance solutions that are quick to activate and reassuring over time.",
    "hero.cta.expert": "Talk to an expert",
    "hero.cta.modules": "Explore our modules",
    "hero.metric1.title": "Human advice",
    "hero.metric1.desc": "An accessible broker, not a cold interface.",
    "hero.metric2.title": "Smart routing",
    "hero.metric2.desc": "Every request reaches the right team.",
    "hero.metric3.title": "Smooth journeys",
    "hero.metric3.desc": "Mobile, tablet and desktop without friction.",
    "hero.media.badge": "Premium guidance",
    "hero.media.badgeAccent": "100% digital",
    "hero.media.caption.badge": "Trusted experience",
    "hero.media.caption.text": "A clear, reassuring relationship supported over time.",
    "hero.media.sideFast.title": "Fast handling",
    "hero.media.sideFast.text": "Directed to the right mailbox from the very first message.",
    "hero.media.sideAvailable.title": "Available",
    "hero.media.sideAvailable.text": "Clear support for individuals and businesses.",
    "hero.trust.1.title": "Operational clarity",
    "hero.trust.1.desc": "Clear journeys, visible priorities and a more reassuring tone from the first screens.",
    "hero.trust.2.title": "Immediate trust",
    "hero.trust.2.desc": "Credibility, contact and compliance signals are displayed more clearly across the site.",
    "hero.trust.3.title": "Premium experience",
    "hero.trust.3.desc": "A sharper presentation on mobile and desktop, with more breathing room and visual consistency.",
    "solutions.badge": "Our solutions",
    "solutions.title": "Four modules that protect what matters most.",
    "solutions.desc": "Each offer is easy to read, quick to compare and built around advisory support.",
    "solutions.auto.badge": "Auto",
    "solutions.auto.title": "Protected mobility",
    "solutions.auto.desc": "Simple guarantees you can activate quickly to drive with more clarity and less friction.",
    "solutions.home.badge": "Home",
    "solutions.home.title": "Secured assets",
    "solutions.home.desc": "Clearer coverage to protect your home, belongings and everyday life.",
    "solutions.health.badge": "Health",
    "solutions.health.title": "Family protection",
    "solutions.health.desc": "A flexible approach to align health protection with your real-life needs.",
    "solutions.pro.badge": "Business",
    "solutions.pro.title": "Controlled activity",
    "solutions.pro.desc": "Solutions designed for freelancers, executives and organizations that need real responsiveness.",
    "method.badge": "Our method",
    "method.title": "A clearer experience at every step.",
    "method.step1.badge": "Step 1",
    "method.step1.title": "Define the need",
    "method.step1.desc": "We translate your situation into concrete protection priorities.",
    "method.step2.badge": "Step 2",
    "method.step2.title": "Compare with clarity",
    "method.step2.desc": "Coverage is easy to read, without opaque jargon or unnecessary uncertainty.",
    "method.step3.badge": "Step 3",
    "method.step3.title": "Support over time",
    "method.step3.desc": "Management, requests or complaints: each topic follows a clearly routed channel.",
    "method.why.badge": "Why it changes everything",
    "method.why.desc": "Digital tools speed up good advice far better than they replace a poor customer journey.",
    "method.stat1.desc": "dedicated addresses to route your requests clearly.",
    "method.stat2.desc": "responsive site available on all your screens.",
    "seo.badge": "France & compliance",
    "seo.title": "Insurance broker in France for individuals and businesses.",
    "seo.desc": "Based in Paris, KASIASSUR supports auto, home, health and business insurance needs with a digital journey, human advice and verifiable legal information.",
    "seo.card1.badge": "Registration",
    "seo.card1.title": "Verifiable ORIAS number",
    "seo.card1.desc": "26004041, verifiable on www.orias.fr to strengthen trust and transparency.",
    "seo.card2.badge": "Local",
    "seo.card2.title": "Paris base, service across France",
    "seo.card2.desc": "Registered office in Paris and support for individuals and businesses throughout France.",
    "seo.card3.badge": "Trust",
    "seo.card3.title": "Clear legal signals and contacts",
    "seo.card3.desc": "SIREN, ORIAS, legal notice, privacy policy and visible contact channels to reassure visitors and Google.",
    "reviews.badge": "Customer reviews",
    "reviews.title": "Customer feedback that builds trust.",
    "reviews.desc": "Clear advice, serious support and a smooth process: this is what our clients value most.",
    "reviews.starsLabel": "5 stars out of 5",
    "reviews.review1.text": "Fast and professional service. Very good overall experience.",
    "reviews.review1.name": "Mohamed Benali",
    "reviews.review2.text": "Clear advice and strong support from start to finish.",
    "reviews.review2.name": "Sarah Lemaire",
    "reviews.review3.text": "Simple, fast and efficient process. I highly recommend.",
    "reviews.review3.name": "Yassine Kabbaj",
    "faq.badge": "Frequently asked questions",
    "faq.title": "Clear answers to help you choose the right insurance.",
    "faq.desc": "Quickly find the most useful information to choose your coverage and understand the KASIASSUR journey.",
    "faq.q1.title": "What insurance products does KASIASSUR offer?",
    "faq.q1.desc": "KASIASSUR supports individuals and businesses with auto, home, health and business insurance, with a clearer reading of guarantees.",
    "faq.q2.title": "How do I contact the right department?",
    "faq.q2.desc": "The form routes your message to the right recipient: general contact, file management or complaint handling, to speed up processing.",
    "faq.q3.title": "Does KASIASSUR support both individuals and businesses?",
    "faq.q3.desc": "Yes. The firm supports individuals, freelancers, executives and companies looking for a digital insurance broker with genuine human advice.",
    "faq.q4.title": "How can I request a quote or support?",
    "faq.q4.desc": "You can describe your needs using the contact form. The site checks the information entered and prepares a pre-filled email to the right KASIASSUR address."
  });

  Object.assign(translations.en.index, {
    "contact.badge": "Contact",
    "contact.title": "Get in touch with the right team.",
    "contact.desc": "The form remains fully client-side: it validates your fields, prepares your message, animates the confirmation and opens your mailbox with the right recipient.",
    "contact.form.name.label": "Full name",
    "contact.form.name.placeholder": "Your identity",
    "contact.form.subject.label": "Subject",
    "contact.form.subject.help": "The message will be routed automatically.",
    "contact.form.subject.general": "General information",
    "contact.form.subject.gestion": "File management",
    "contact.form.subject.reclamation": "Complaints service",
    "contact.form.email.label": "Email address",
    "contact.form.email.placeholder": "you@company.com",
    "contact.form.email.help": "Expected format: name@domain.com",
    "contact.form.phone.label": "Phone",
    "contact.form.phone.placeholder": "+33 6 12 34 56 78",
    "contact.form.phone.help": "International formats with spaces are accepted.",
    "contact.form.message.label": "Your message",
    "contact.form.message.placeholder": "Describe your need, project or request.",
    "contact.form.message.help": "The clearer your context, the more useful the response will be.",
    "contact.form.destination.badge": "Automatic destination",
    "contact.form.submit": "Send my request",
    "contact.form.status.idle": "No server-side sending: the site prepares an email to the right address.",
    "contact.form.success": "Message ready. Opening your email app...",
    "contact.form.destination.general": "General information",
    "contact.form.destination.gestion": "File management",
    "contact.form.destination.reclamation": "Complaints service",
    "contact.routes.badge": "Professional routing",
    "contact.routes.title": "Three channels, zero confusion.",
    "contact.routes.desc": "Premium colors remain contrasted to guarantee readability, accessibility and trust.",
    "contact.routes.general.badge": "General",
    "contact.routes.general.title": "Support & information",
    "contact.routes.general.desc": "For any general request about solutions, quotes or guidance.",
    "contact.routes.gestion.badge": "Management",
    "contact.routes.gestion.title": "File follow-up",
    "contact.routes.gestion.desc": "For day-to-day management, documents, amendments or contractual questions.",
    "contact.routes.reclamation.badge": "Complaint",
    "contact.routes.reclamation.title": "Service quality",
    "contact.routes.reclamation.desc": "To report a problem, dissatisfaction or request escalation.",
    "legal.badge": "Contact & legal information",
    "legal.title": "Professional details and company identifiers.",
    "legal.desc": "Clear, visible and easy-to-verify information to strengthen trust at every contact point.",
    "legal.phone.label": "Business phone",
    "legal.orias.label": "ORIAS number",
    "legal.siren.label": "SIREN number",
    "legal.note": "Company registered in France - compliant with applicable regulations.",
    "footer.brand.tagline": "Digital brokerage, human advice, lasting relationships.",
    "footer.proof.badge": "Quick verification",
    "footer.proof.desc": "Direct contact details and visible company identifiers to verify KASIASSUR at a glance.",
    "footer.proof.phone": "Phone",
    "footer.proof.orias": "ORIAS",
    "footer.proof.siren": "SIREN",
    "footer.social.kicker": "Social presence",
    "footer.social.title": "LinkedIn, Facebook and Instagram",
    "footer.links.legal": "Legal notice",
    "footer.links.privacy": "Privacy",
    "messages.nameRequired": "Please enter your full name.",
    "messages.emailRequired": "Please enter your email address.",
    "messages.emailInvalid": "Invalid email format. Example: name@domain.com",
    "messages.phoneRequired": "Please enter your phone number.",
    "messages.phoneInvalid": "Invalid number. Use a format such as +33 6 12 34 56 78.",
    "messages.formInvalid": "The form contains fields that must be corrected before sending.",
    "messages.submitPreparing": "Preparing...",
    "messages.submitReady": "Request ready",
    "messages.formRouted": "Your request is being routed to {email}.",
    "messages.mailSubject": "KASIASSUR - {label}",
    "messages.mailGreeting": "Hello,",
    "messages.mailIntent": "I would like to contact you regarding: {label}.",
    "messages.mailName": "Full name: {value}",
    "messages.mailEmail": "Email: {value}",
    "messages.mailPhone": "Phone: {value}",
    "messages.mailMessage": "Message:",
    "messages.mailSpecify": "To be specified",
    "messages.mailRegards": "Kind regards"
  });

  Object.assign(translations.es.index, {
    "meta.title": "KASIASSUR | Corredor de seguros en Paris para auto, hogar, salud y empresa",
    "meta.description": "KASIASSUR, corredor de seguros en Paris, acompana a particulares y empresas en Francia para auto, hogar, salud y empresa. ORIAS 26004041.",
    "brand.tagline": "Su socio de confianza",
    "nav.solutions": "Soluciones",
    "nav.method": "Metodo",
    "nav.faq": "FAQ",
    "nav.contact": "Contacto",
    "nav.clientSpace": "Hablar con un asesor",
    "hero.badge": "Correduria de seguros digital",
    "hero.title.1": "Proteccion",
    "hero.title.2": "con la",
    "hero.title.3": "precision",
    "hero.title.4": "de un",
    "hero.title.5": "verdadero asesoramiento.",
    "hero.copy": "KASIASSUR simplifica la correduria con una experiencia premium, acompanamiento humano y recorridos 100% digitalizados. Ayudamos a particulares y empresas a elegir soluciones de seguro de auto, hogar, salud y empresa claras, rapidas de activar y tranquilizadoras a largo plazo.",
    "hero.cta.expert": "Hablar con un experto",
    "hero.cta.modules": "Descubrir nuestros modulos",
    "hero.metric1.title": "Asesoramiento humano",
    "hero.metric1.desc": "Un corredor accesible, no una interfaz fria.",
    "hero.metric2.title": "Enrutamiento inteligente",
    "hero.metric2.desc": "Cada solicitud llega al equipo adecuado.",
    "hero.metric3.title": "Recorridos fluidos",
    "hero.metric3.desc": "Movil, tableta y escritorio sin friccion.",
    "hero.media.badge": "Acompanamiento premium",
    "hero.media.badgeAccent": "100% digital",
    "hero.media.caption.badge": "Experiencia de confianza",
    "hero.media.caption.text": "Una relacion clara, tranquilizadora y acompanada en el tiempo.",
    "hero.media.sideFast.title": "Tratamiento rapido",
    "hero.media.sideFast.text": "Orientacion hacia el buzon correcto desde el primer mensaje.",
    "hero.media.sideAvailable.title": "Disponible",
    "hero.media.sideAvailable.text": "Acompanamiento claro para particulares y empresas.",
    "hero.trust.1.title": "Claridad operativa",
    "hero.trust.1.desc": "Recorridos legibles, prioridades visibles y un tono mas tranquilizador desde las primeras pantallas.",
    "hero.trust.2.title": "Confianza inmediata",
    "hero.trust.2.desc": "Las senales de credibilidad, contacto y conformidad se muestran mejor en todo el sitio.",
    "hero.trust.3.title": "Experiencia premium",
    "hero.trust.3.desc": "Una presentacion mas nitida en movil y escritorio, con mas aire y coherencia visual.",
    "solutions.badge": "Nuestras soluciones",
    "solutions.title": "Cuatro modulos que protegen lo esencial.",
    "solutions.desc": "Cada oferta se lee facilmente, se compara rapidamente y se integra en una logica de asesoramiento.",
    "solutions.auto.badge": "Auto",
    "solutions.auto.title": "Movilidad protegida",
    "solutions.auto.desc": "Garantias simples de activar para conducir con mas claridad y menos friccion.",
    "solutions.home.badge": "Hogar",
    "solutions.home.title": "Patrimonio seguro",
    "solutions.home.desc": "Una cobertura mas clara para proteger su vivienda, sus bienes y su vida diaria.",
    "solutions.health.badge": "Salud",
    "solutions.health.title": "Proteccion familiar",
    "solutions.health.desc": "Un enfoque flexible para alinear la proteccion de salud con sus necesidades reales.",
    "solutions.pro.badge": "Profesionales",
    "solutions.pro.title": "Actividad controlada",
    "solutions.pro.desc": "Soluciones disenadas para autonomos, directivos y estructuras que necesitan verdadera capacidad de respuesta.",
    "method.badge": "Nuestro metodo",
    "method.title": "Una experiencia mas clara en cada etapa.",
    "method.step1.badge": "Paso 1",
    "method.step1.title": "Definir la necesidad",
    "method.step1.desc": "Traducimos su situacion en prioridades concretas de proteccion.",
    "method.step2.badge": "Paso 2",
    "method.step2.title": "Comparar con claridad",
    "method.step2.desc": "Las garantias se leen rapido, sin jerga opaca ni dudas innecesarias.",
    "method.step3.badge": "Paso 3",
    "method.step3.title": "Acompanar a largo plazo",
    "method.step3.desc": "Gestion, solicitud o reclamacion: cada tema sigue un canal claramente enrutado.",
    "method.why.badge": "Por que cambia todo",
    "method.why.desc": "Lo digital acelera mejor un buen asesoramiento de lo que puede reemplazar un mal recorrido.",
    "method.stat1.desc": "direcciones dedicadas para enrutar claramente sus solicitudes.",
    "method.stat2.desc": "sitio responsive y disponible en todas sus pantallas.",
    "seo.badge": "Francia y conformidad",
    "seo.title": "Corredor de seguros en Francia para particulares y empresas.",
    "seo.desc": "Con sede en Paris, KASIASSUR acompana las necesidades de seguros de auto, hogar, salud y empresa con un recorrido digital, asesoramiento humano e informacion legal verificable.",
    "seo.card1.badge": "Registro",
    "seo.card1.title": "Numero ORIAS verificable",
    "seo.card1.desc": "26004041, verificable en www.orias.fr para reforzar la confianza y la transparencia.",
    "seo.card2.badge": "Local",
    "seo.card2.title": "Base en Paris, servicio en toda Francia",
    "seo.card2.desc": "Domicilio social en Paris y acompanamiento para particulares y empresas en todo el territorio frances.",
    "seo.card3.badge": "Confianza",
    "seo.card3.title": "Senales legales y contactos claros",
    "seo.card3.desc": "SIREN, ORIAS, aviso legal, politica de privacidad y canales de contacto visibles para tranquilizar a los visitantes y a Google.",
    "reviews.badge": "Resenas de clientes",
    "reviews.title": "Opiniones de clientes que refuerzan la confianza.",
    "reviews.desc": "Asesoramiento claro, acompanamiento serio y un proceso fluido: esto es lo que mas valoran nuestros clientes.",
    "reviews.starsLabel": "5 estrellas de 5",
    "reviews.review1.text": "Servicio rapido y profesional. Muy buena experiencia general.",
    "reviews.review1.name": "Mohamed Benali",
    "reviews.review2.text": "Consejos claros y acompanamiento serio de principio a fin.",
    "reviews.review2.name": "Sarah Lemaire",
    "reviews.review3.text": "Proceso simple, rapido y eficaz. Lo recomiendo.",
    "reviews.review3.name": "Yassine Kabbaj",
    "faq.badge": "Preguntas frecuentes",
    "faq.title": "Respuestas claras para elegir mejor su seguro.",
    "faq.desc": "Encuentre rapidamente la informacion mas util para elegir su cobertura y comprender el recorrido KASIASSUR.",
    "faq.q1.title": "Que seguros ofrece KASIASSUR?",
    "faq.q1.desc": "KASIASSUR acompana a particulares y empresas en seguros de auto, hogar, salud y empresa, con una lectura mas simple de las garantias.",
    "faq.q2.title": "Como contactar con el servicio adecuado?",
    "faq.q2.desc": "El formulario dirige su mensaje al destinatario correcto: contacto general, gestion de expediente o reclamaciones, para acelerar el tratamiento de su solicitud.",
    "faq.q3.title": "KASIASSUR acompana a particulares y empresas?",
    "faq.q3.desc": "Si. El despacho acompana a particulares, autonomos, directivos y empresas que buscan un corredor de seguros digital con verdadero asesoramiento humano.",
    "faq.q4.title": "Como solicitar un presupuesto o acompanamiento?",
    "faq.q4.desc": "Puede describir su necesidad desde el formulario de contacto. El sitio verifica la informacion introducida y prepara un correo prellenado hacia la direccion adecuada de KASIASSUR."
  });

  Object.assign(translations.es.index, {
    "contact.badge": "Contacto",
    "contact.title": "Pongase en contacto con el equipo adecuado.",
    "contact.desc": "El formulario es 100% del lado del cliente: valida sus campos, prepara su mensaje, anima la confirmacion y abre su bandeja con el destinatario adecuado.",
    "contact.form.name.label": "Nombre y apellidos",
    "contact.form.name.placeholder": "Su identidad",
    "contact.form.subject.label": "Asunto",
    "contact.form.subject.help": "El mensaje se enrutara automaticamente.",
    "contact.form.subject.general": "Informacion general",
    "contact.form.subject.gestion": "Gestion de expediente",
    "contact.form.subject.reclamation": "Servicio de reclamaciones",
    "contact.form.email.label": "Correo electronico",
    "contact.form.email.placeholder": "usted@empresa.es",
    "contact.form.email.help": "Formato esperado: nombre@dominio.com",
    "contact.form.phone.label": "Telefono",
    "contact.form.phone.placeholder": "+33 6 12 34 56 78",
    "contact.form.phone.help": "Se aceptan formatos internacionales con espacios.",
    "contact.form.message.label": "Su mensaje",
    "contact.form.message.placeholder": "Describa su necesidad, su proyecto o su solicitud.",
    "contact.form.message.help": "Cuanto mas claro sea el contexto, mas util sera la respuesta.",
    "contact.form.destination.badge": "Destino automatico",
    "contact.form.submit": "Enviar mi solicitud",
    "contact.form.status.idle": "Sin envio por servidor: el sitio prepara un correo hacia la direccion correcta.",
    "contact.form.success": "Mensaje listo. Apertura de su correo...",
    "contact.form.destination.general": "Informacion general",
    "contact.form.destination.gestion": "Gestion de expediente",
    "contact.form.destination.reclamation": "Servicio de reclamaciones",
    "contact.routes.badge": "Enrutamiento profesional",
    "contact.routes.title": "Tres canales, cero confusion.",
    "contact.routes.desc": "Los colores premium siguen siendo contrastados para garantizar legibilidad, accesibilidad y confianza.",
    "contact.routes.general.badge": "General",
    "contact.routes.general.title": "Soporte e informacion",
    "contact.routes.general.desc": "Para cualquier solicitud general sobre soluciones, presupuestos u orientacion.",
    "contact.routes.gestion.badge": "Gestion",
    "contact.routes.gestion.title": "Seguimiento de expediente",
    "contact.routes.gestion.desc": "Para la gestion diaria, documentos, anexos o cuestiones contractuales.",
    "contact.routes.reclamation.badge": "Reclamacion",
    "contact.routes.reclamation.title": "Calidad del servicio",
    "contact.routes.reclamation.desc": "Para senalar un problema, una insatisfaccion o solicitar una escalada.",
    "legal.badge": "Contacto e informacion legal",
    "legal.title": "Datos profesionales e identificadores de la empresa.",
    "legal.desc": "Informacion clara, visible y facil de verificar para reforzar la confianza en cada punto de contacto.",
    "legal.phone.label": "Telefono profesional",
    "legal.orias.label": "Numero ORIAS",
    "legal.siren.label": "Numero SIREN",
    "legal.note": "Empresa registrada en Francia - conforme a la normativa vigente.",
    "footer.brand.tagline": "Correduria digital, asesoramiento humano, relacion duradera.",
    "footer.proof.badge": "Verificacion rapida",
    "footer.proof.desc": "Datos de contacto directos e identificadores visibles para verificar KASIASSUR de un vistazo.",
    "footer.proof.phone": "Telefono",
    "footer.proof.orias": "ORIAS",
    "footer.proof.siren": "SIREN",
    "footer.social.kicker": "Presencia social",
    "footer.social.title": "LinkedIn, Facebook e Instagram",
    "footer.links.legal": "Aviso legal",
    "footer.links.privacy": "Privacidad",
    "messages.nameRequired": "Por favor, indique su nombre y apellidos.",
    "messages.emailRequired": "Por favor, indique su correo electronico.",
    "messages.emailInvalid": "Formato de correo invalido. Ejemplo: nombre@dominio.com",
    "messages.phoneRequired": "Por favor, indique su numero de telefono.",
    "messages.phoneInvalid": "Numero invalido. Use un formato como +33 6 12 34 56 78.",
    "messages.formInvalid": "El formulario contiene campos que deben corregirse antes del envio.",
    "messages.submitPreparing": "Preparando...",
    "messages.submitReady": "Solicitud lista",
    "messages.formRouted": "Su solicitud esta siendo enviada a {email}.",
    "messages.mailSubject": "KASIASSUR - {label}",
    "messages.mailGreeting": "Hola,",
    "messages.mailIntent": "Deseo ponerme en contacto con ustedes sobre: {label}.",
    "messages.mailName": "Nombre y apellidos: {value}",
    "messages.mailEmail": "Correo electronico: {value}",
    "messages.mailPhone": "Telefono: {value}",
    "messages.mailMessage": "Mensaje:",
    "messages.mailSpecify": "Por precisar",
    "messages.mailRegards": "Saludos cordiales"
  });

  Object.assign(translations.en.legal, {
    "meta.title": "Legal notice | KASIASSUR",
    "meta.description": "Legal notice for the KASIASSUR website.",
    "header.back": "Back to home",
    "header.eyebrow": "Legal information",
    "header.title": "Legal notice",
    "header.desc": "KASIASSUR provides visitors with the essential legal information relating to website publishing, its insurance brokerage activity and its professional contact details.",
    "summary.phone": "Phone",
    "summary.orias": "ORIAS",
    "summary.siren": "SIREN",
    "editor.title": "Website publisher",
    "editor.company": "Company name: KASIASSUR",
    "editor.legalForm": "Legal form: Single-member simplified joint-stock company (SASU)",
    "editor.capital": "Share capital: EUR 100.00",
    "editor.office": "Registered office: 50 avenue des Champs-Elysees, 75008 Paris",
    "editor.siren": "SIREN: 100 898 089",
    "editor.rcs": "Trade register: Paris",
    "editor.vat": "VAT number: FR751001898089",
    "editor.director": "Publishing director: Kawtar Soubhani",
    "brokerage.title": "Insurance brokerage activity",
    "brokerage.desc": "KASIASSUR carries out insurance brokerage activities in compliance with the regulations applicable to insurance intermediaries.",
    "brokerage.item1": "ORIAS number: 26004041",
    "brokerage.item2": "Can be verified on www.orias.fr",
    "brokerage.item3": "Supervisory authority: Autorite de Controle Prudentiel et de Resolution (ACPR), 4 Place de Budapest, 75009 Paris",
    "brokerage.item4": "Professional indemnity insurance compliant with the law",
    "contact.title": "Contact details",
    "contact.phone": "Phone:",
    "contact.email": "General email:",
    "contact.management": "File management:",
    "contact.claims": "Complaints:",
    "ip.title": "Intellectual property",
    "ip.desc": "All content available on this website, including texts, visuals, illustrations, graphic elements and interface components, is protected by intellectual property law. Any full or partial reproduction without prior authorization is prohibited.",
    "regulatory.title": "Regulatory information",
    "regulatory.desc": "The legal information published on this page is intended to ensure a clear identification of the publisher and its activity, with a view to transparency, trust and compliance with the French regulations applicable to professional websites."
  });

  Object.assign(translations.en.privacy, {
    "meta.title": "Privacy policy | KASIASSUR",
    "meta.description": "Privacy policy and GDPR information for the KASIASSUR website.",
    "header.back": "Back to home",
    "header.eyebrow": "GDPR",
    "header.title": "Privacy policy",
    "header.desc": "This document presents the essential information relating to the protection of personal data processed by KASIASSUR through its website.",
    "summary.contact": "Contact",
    "summary.phone": "Phone",
    "summary.company": "Company",
    "controller.title": "Data controller",
    "controller.desc1": "KASIASSUR is the controller of personal data processing.",
    "controller.desc2": "GDPR contact details: contact@kasiassur.fr.",
    "data.title": "Collected data",
    "data.desc": "The data that may be collected through the contact form are: full name, email address, phone number, request subject and message.",
    "purposes.title": "Purposes",
    "purposes.item1": "Respond to contact requests.",
    "purposes.item2": "Route messages to the right internal department.",
    "purposes.item3": "Ensure follow-up of the client or prospect relationship.",
    "legalBasis.title": "Legal basis",
    "legalBasis.desc": "Processing is based on KASIASSUR's legitimate interest in responding to requests received and, where applicable, on the performance of pre-contractual measures at the request of the data subject.",
    "retention.title": "Retention period",
    "retention.desc": "Data are kept for the time necessary to process the request, then archived or deleted according to applicable legal and regulatory obligations.",
    "recipients.title": "Recipients",
    "recipients.desc": "The data are intended for KASIASSUR's authorized teams and, where applicable, its strictly authorized technical service providers within the scope of their missions.",
    "rights.title": "Your rights",
    "rights.item1": "Right of access, rectification and erasure.",
    "rights.item2": "Right to restriction and objection.",
    "rights.item3": "Right to portability where applicable.",
    "rights.item4": "Right to lodge a complaint with the competent authority.",
    "contact.title": "GDPR contact",
    "contact.desc": "To exercise your rights or ask a question about privacy, you can write to: contact@kasiassur.fr"
  });

  Object.assign(translations.es.legal, {
    "meta.title": "Aviso legal | KASIASSUR",
    "meta.description": "Aviso legal del sitio web de KASIASSUR.",
    "header.back": "Volver al inicio",
    "header.eyebrow": "Informacion legal",
    "header.title": "Aviso legal",
    "header.desc": "KASIASSUR pone a disposicion de los visitantes la informacion legal esencial relativa a la edicion del sitio, a su actividad de correduria de seguros y a sus datos de contacto profesionales.",
    "summary.phone": "Telefono",
    "summary.orias": "ORIAS",
    "summary.siren": "SIREN",
    "editor.title": "Editor del sitio",
    "editor.company": "Razon social: KASIASSUR",
    "editor.legalForm": "Forma juridica: Sociedad por acciones simplificada unipersonal (SASU)",
    "editor.capital": "Capital social: 100,00 EUR",
    "editor.office": "Domicilio social: 50 avenue des Champs-Elysees, 75008 Paris",
    "editor.siren": "SIREN: 100 898 089",
    "editor.rcs": "Registro mercantil: Paris",
    "editor.vat": "Numero de IVA intracomunitario: FR751001898089",
    "editor.director": "Director de publicacion: Kawtar Soubhani",
    "brokerage.title": "Actividad de correduria de seguros",
    "brokerage.desc": "KASIASSUR ejerce una actividad de correduria de seguros conforme a la normativa aplicable a los intermediarios de seguros.",
    "brokerage.item1": "Numero ORIAS: 26004041",
    "brokerage.item2": "Verificable en www.orias.fr",
    "brokerage.item3": "Autoridad de control: Autorite de Controle Prudentiel et de Resolution (ACPR), 4 Place de Budapest, 75009 Paris",
    "brokerage.item4": "Responsabilidad civil profesional conforme a la ley",
    "contact.title": "Datos de contacto",
    "contact.phone": "Telefono:",
    "contact.email": "Correo electronico general:",
    "contact.management": "Gestion de expediente:",
    "contact.claims": "Reclamaciones:",
    "ip.title": "Propiedad intelectual",
    "ip.desc": "Todos los contenidos presentes en este sitio, en particular textos, elementos visuales, ilustraciones, elementos graficos y componentes de interfaz, estan protegidos por la normativa de propiedad intelectual. Queda prohibida toda reproduccion total o parcial sin autorizacion previa.",
    "regulatory.title": "Informacion reglamentaria",
    "regulatory.desc": "La informacion legal publicada en esta pagina tiene como objetivo asegurar una identificacion clara del editor y de su actividad, con fines de transparencia, confianza y conformidad con la normativa francesa aplicable a los sitios profesionales."
  });

  Object.assign(translations.es.privacy, {
    "meta.title": "Politica de privacidad | KASIASSUR",
    "meta.description": "Politica de privacidad e informacion RGPD del sitio KASIASSUR.",
    "header.back": "Volver al inicio",
    "header.eyebrow": "RGPD",
    "header.title": "Politica de privacidad",
    "header.desc": "Este documento presenta la informacion esencial relativa a la proteccion de los datos personales tratados por KASIASSUR a traves de su sitio web.",
    "summary.contact": "Contacto",
    "summary.phone": "Telefono",
    "summary.company": "Empresa",
    "controller.title": "Responsable del tratamiento",
    "controller.desc1": "KASIASSUR es el responsable del tratamiento de los datos personales.",
    "controller.desc2": "Datos de contacto RGPD: contact@kasiassur.fr.",
    "data.title": "Datos recopilados",
    "data.desc": "Los datos que pueden recopilarse a traves del formulario de contacto son: nombre y apellidos, correo electronico, numero de telefono, asunto de la solicitud y mensaje.",
    "purposes.title": "Finalidades",
    "purposes.item1": "Responder a las solicitudes de contacto.",
    "purposes.item2": "Dirigir los mensajes al servicio interno adecuado.",
    "purposes.item3": "Asegurar el seguimiento de la relacion con clientes o prospectos.",
    "legalBasis.title": "Base juridica",
    "legalBasis.desc": "El tratamiento se basa en el interes legitimo de KASIASSUR en responder a las solicitudes recibidas y, en su caso, en la ejecucion de medidas precontractuales a peticion del interesado.",
    "retention.title": "Plazo de conservacion",
    "retention.desc": "Los datos se conservan durante el tiempo necesario para tramitar la solicitud y despues se archivan o eliminan de acuerdo con las obligaciones legales y reglamentarias aplicables.",
    "recipients.title": "Destinatarios",
    "recipients.desc": "Los datos estan destinados a los equipos autorizados de KASIASSUR y, en su caso, a sus proveedores tecnicos estrictamente autorizados dentro del marco de sus misiones.",
    "rights.title": "Sus derechos",
    "rights.item1": "Derecho de acceso, rectificacion y supresion.",
    "rights.item2": "Derecho de limitacion y oposicion.",
    "rights.item3": "Derecho a la portabilidad cuando proceda.",
    "rights.item4": "Derecho a presentar una reclamacion ante la autoridad competente.",
    "contact.title": "Contacto RGPD",
    "contact.desc": "Para ejercer sus derechos o plantear una pregunta sobre privacidad, puede escribir a: contact@kasiassur.fr"
  });

  function getStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Ignore storage errors.
    }
  }

  function getPageName() {
    return document.body?.dataset?.page || "index";
  }

  const baselineTranslations = {};

  function ensureBaseline(pageName) {
    if (!baselineTranslations[pageName]) {
      baselineTranslations[pageName] = {};
    }

    const store = baselineTranslations[pageName];

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      store[element.dataset.i18n] = element.textContent;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      store[element.dataset.i18nHtml] = element.innerHTML;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      store[element.dataset.i18nPlaceholder] = element.getAttribute("placeholder") || "";
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      store[element.dataset.i18nAriaLabel] = element.getAttribute("aria-label") || "";
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      store[element.dataset.i18nTitle] = element.getAttribute("title") || "";
    });

    if (!store["meta.title"]) {
      store["meta.title"] = document.title;
    }

    const description = document.querySelector('meta[name="description"]');
    if (description && !store["meta.description"]) {
      store["meta.description"] = description.getAttribute("content") || "";
    }

    if (!store["switcher.label"]) {
      store["switcher.label"] = "Selecteur de langue";
    }
  }

  function translateKey(language, pageName, key) {
    return (
      translations[language]?.[pageName]?.[key] ??
      translations[language]?.common?.[key] ??
      baselineTranslations[pageName]?.[key] ??
      translations[DEFAULT_LANGUAGE]?.common?.[key] ??
      ""
    );
  }

  function formatString(template, values) {
    return String(template).replace(/\{(\w+)\}/g, (_, token) => (values[token] != null ? values[token] : ""));
  }

  let currentLanguage = getStoredLanguage();

  function applyTranslations(language) {
    const pageName = getPageName();
    currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
    document.documentElement.lang = currentLanguage;
    ensureBaseline(pageName);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translateKey(currentLanguage, pageName, element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      element.innerHTML = translateKey(currentLanguage, pageName, element.dataset.i18nHtml);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", translateKey(currentLanguage, pageName, element.dataset.i18nPlaceholder));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", translateKey(currentLanguage, pageName, element.dataset.i18nAriaLabel));
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.setAttribute("title", translateKey(currentLanguage, pageName, element.dataset.i18nTitle));
    });

    const titleText = translateKey(currentLanguage, pageName, "meta.title");
    if (titleText) {
      document.title = titleText;
    }

    const description = document.querySelector('meta[name="description"]');
    const descriptionText = translateKey(currentLanguage, pageName, "meta.description");
    if (description && descriptionText) {
      description.setAttribute("content", descriptionText);
    }

    document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
      switcher.setAttribute("aria-label", translateKey(currentLanguage, pageName, "switcher.label"));

      switcher.querySelectorAll("[data-lang]").forEach((button) => {
        const isActive = button.dataset.lang === currentLanguage;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    });

    document.dispatchEvent(
      new CustomEvent("kasiassur:languagechange", {
        detail: {
          language: currentLanguage,
          page: pageName
        }
      })
    );
  }

  function setLanguage(language) {
    const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
    storeLanguage(nextLanguage);
    applyTranslations(nextLanguage);
  }

  function t(key) {
    return translateKey(currentLanguage, getPageName(), key);
  }

  function format(key, values) {
    return formatString(t(key), values || {});
  }

  function initSwitchers() {
    document.querySelectorAll("[data-language-switcher] [data-lang]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
  }

  window.KASIASSUR_I18N = {
    defaultLanguage: DEFAULT_LANGUAGE,
    supportedLanguages: SUPPORTED_LANGUAGES.slice(),
    getLanguage: () => currentLanguage,
    setLanguage,
    t,
    format
  };

  initSwitchers();
  applyTranslations(currentLanguage);
})();
