# KASIASSUR

Landing page statique premium pour un cabinet de courtage en assurance digital.

## Contenu

- `index.html` : page d'accueil KASIASSUR
- `styles.css` : design system, responsive et animations
- `script.js` : interactions du formulaire et animations d'apparition
- `mentions-legales.html` : base de mentions légales à compléter
- `politique-confidentialite.html` : base RGPD à compléter

## Lancement local

Le site peut être ouvert directement via `index.html` dans un navigateur.

Si vous préférez un serveur local, vous pouvez utiliser Node.js :

```powershell
npx serve .
```

## Formulaire de contact

Le formulaire oriente automatiquement la demande selon le sujet choisi :

- `Information Générale` vers `contact@kasiassur.fr`
- `Gestion de dossier` vers `gestion@kasiassur.fr`
- `Service Réclamation` vers `reclamation@kasiassur.fr`

La soumission utilise `mailto:` pour préremplir la messagerie de l'utilisateur avec la bonne
adresse destinataire.
