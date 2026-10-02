# Romaric AKODJENOU – Portfolio

Portfolio personnel bilingue (français / anglais), au design et aux mises en page du
template **Salimov – Horizontal Personal Portfolio** (celtano), réécrits en React.

- **Next.js 16** (App Router, pré-rendu statique) · **React 19** · **TypeScript**
- **next-intl** pour le français et l'anglais (`messages/fr.json`, `messages/en.json`)
- **Tailwind CSS 3** + feuille de style dédiée `src/app/[locale]/salimov.css`
- **Framer Motion** (carrousel du portfolio)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint     # ESLint
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` (jamais committé) :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_APP_LINK` | URL publique du site (sitemap, robots, Open Graph) |
| `NEXT_PUBLIC_COLOR_SWITCHER` | `true` affiche le sélecteur de couleur d'accent (propriétaire seulement) |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) pour envoyer les messages du formulaire de contact |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les messages (par défaut : l'e-mail de `src/config/site.ts`) |
| `CONTACT_FROM_EMAIL` | Expéditeur (par défaut `Portfolio <onboarding@resend.dev>`) |

Sans `RESEND_API_KEY`, le formulaire propose un repli « Écrivez-moi par e-mail ».

## Où modifier quoi

| Je veux… | Fichier |
|---|---|
| masquer une section (Facts, Services, Témoignages, Clients, Blog) | `src/config/site.ts` → `sections` |
| changer e-mail, téléphone, date de naissance, clients | `src/config/site.ts` |
| modifier les textes | `messages/fr.json` et `messages/en.json` |
| ajouter un projet au portfolio | `src/app/[locale]/components/salimov/Portfolio.tsx` + image dans `public/realisation/` |
| ajouter une compétence | `src/app/[locale]/components/salimov/skills.tsx` |
| publier un article | `src/content/posts.ts` (passer `placeholder` à `false`, renseigner `date`) |
| changer les couleurs / la mise en page | `src/app/[locale]/salimov.css` |

## Fonctionnement

- **Défilement horizontal** sur grand écran avec souris ou pavé tactile (> 1024 px) ; défilement
  vertical sur mobile et tablettes tactiles. Chaque section a son adresse (`/fr#about`).
- **Mise à l'échelle** : sur grand écran, toute la mise en page (en `rem`) suit la hauteur de la fenêtre.
- **Thème** clair/sombre mémorisé, appliqué avant le premier affichage (pas de flash).
- **Formulaire de contact** : `POST /api/contact` (validation, champ piège anti-robots,
  limite de 5 messages / 10 min / IP, envoi en texte brut).
- **Sélecteur de couleur** : 9 teintes du template, mémorisées dans le navigateur du propriétaire.

## Licence du design

Le design vient d'un template commercial (ThemeForest). Assurez-vous de disposer d'une licence
valide avant toute diffusion du code ou des images du template.
