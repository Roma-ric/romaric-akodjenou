# CLAUDE.md — Portfolio de Romaric AKODJENOU

> **À lire par tout agent avant de toucher au code.**
> Ce fichier est la **source de vérité sur l'état du projet**. Il doit être **mis à jour à la fin
> de chaque opération validée** (voir « Mise à jour du rapport » en bas).
> Les autres documents (`README.md`, `ROADMAP.md`) restent valables, mais en cas de désaccord,
> c'est ce fichier qui fait foi ; corrigez alors l'autre document.

---

## 1. Ce que c'est

Portfolio personnel **bilingue (anglais / français)** de Romaric AKODJENOU, développeur front-end
basé au Bénin. Site **mono-page** qui présente : profil, compétences, parcours, chiffres clés,
services, projets réalisés, témoignages, clients, contact et un blog.

Le design et les mises en page reprennent le template commercial **« Salimov – Horizontal Personal
Portfolio »** (ThemeForest, auteur celtano), **réécrit en React** sans copier son CSS ni ses images.
Une licence valide du template est nécessaire avant toute diffusion publique du code ou des visuels.

## 2. Ce que ça fait

- **Navigation horizontale** sur ordinateur (> 1024 px **et** pointeur `hover`) : toutes les sections
  sont alignées dans un conteneur `#scroller` ; la molette, les flèches, PageUp/PageDown, Début/Fin et
  une barre de progression déplaçable font défiler latéralement. Les trackpads gardent leur geste natif.
- **Navigation verticale classique** sur mobile et tablettes tactiles.
- **Une URL par section** (`/fr#about`, `/en#contact`…) : l'ancre suit le défilement, les liens
  directs et le bouton « retour » fonctionnent.
- **Mise à l'échelle** : sur grand écran, toute la mise en page (en `rem`) suit la hauteur de fenêtre.
- **Thème clair / sombre** mémorisé (`localStorage.theme`), appliqué avant le premier rendu (pas de flash).
- **Changement de langue instantané** : page de l'autre langue préchargée, position de défilement
  conservée (`sessionStorage`), pas de rejeu de l'écran de chargement.
- **Écran de chargement** en CSS pur (joué une seule fois par page).
- **Carrousel de projets** (Framer Motion, respecte `prefers-reduced-motion`).
- **Compteurs animés** et apparitions au défilement (`Reveal`, `Counter`).
- **Formulaire de contact** → `POST /api/contact` → envoi d'un e-mail texte brut via l'API **Resend**.
  Validation partagée client/serveur, champ piège anti-robots, limite 5 messages / 10 min / IP
  (en mémoire, par instance). Sans `RESEND_API_KEY` : réponse 503 et repli « Écrivez-moi par e-mail ».
- **Blog** : `/[locale]/blog` et `/[locale]/blog/[slug]`, articles statiques dans `src/content/posts.ts`.
  Les articles `placeholder` ne sont ni indexés ni dans le sitemap.
- **SEO** : `generateMetadata` (titre, description, Open Graph, `alternates` par langue), `sitemap.xml`,
  `robots.txt`, `<html lang>` dynamique, pré-rendu statique de `/en` et `/fr`.
- **Âge calculé** depuis la date de naissance ; la page d'accueil est régénérée chaque jour (`revalidate = 86400`).
- **Sélecteur de couleur d'accent** (9 teintes) réservé au propriétaire, visible uniquement avec
  `NEXT_PUBLIC_COLOR_SWITCHER=true`, mémorisé dans le navigateur (`localStorage["sal-accent"]`).

## 3. Stack

| Domaine | Outil |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack en dev), **React 19**, **TypeScript** strict |
| i18n | **next-intl 4** — locales `en` (par défaut) et `fr` |
| Style | Feuille dédiée **`src/app/[locale]/salimov.css`** (tout le design) + **Tailwind CSS 3** réduit à quelques utilitaires (`sr-only`, `hidden`, `dark:…`), config minimale sans thème ni plugin |
| Animation | **Framer Motion** (carrousel), le reste en CSS |
| Icônes | **lucide-react** + SVG maison (`skills.tsx`, `social.tsx`) |
| Polices | Geist, Geist Mono, Livvic (`next/font/google`) |
| E-mail | API HTTP **Resend** (appel `fetch`, pas de SDK) |
| Lint | ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript) |

Pas de base de données, pas de CMS, **pas de tests automatisés**.

## 4. Commandes

```bash
npm install
npm run dev      # http://localhost:3000 (redirige vers /en)
npm run build    # build de production
npm run start
npm run lint     # eslint .
npx tsc --noEmit # vérification des types (pas de script dédié)
```

Variables d'environnement : copier `.env.example` vers `.env.local` (jamais committé).
`NEXT_PUBLIC_APP_LINK`, `NEXT_PUBLIC_COLOR_SWITCHER`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
`CONTACT_FROM_EMAIL`, `RESEND_API_URL` (facultatif). Détail dans `README.md`.

## 5. Architecture

```
src/
├── proxy.ts                      # middleware next-intl (Next 16 : « proxy »), exclut api/_next/fichiers
├── i18n/                         # routing (locales), request (chargement des messages), navigation (Link, useRouter…)
├── config/
│   ├── site.ts                   # sections affichées, e-mail, téléphone, date de naissance, clients, getAge()
│   └── accents.ts                # palette d'accent, applyAccent(), foregroundFor()
├── content/posts.ts              # articles du blog (contenu localisé en dur)
├── lib/
│   ├── scroll.ts                 # cœur de la navigation : DESKTOP_QUERY, scrollToSection, section visible, sauvegarde de position
│   └── contact.ts                # validation du formulaire (partagée client/serveur)
└── app/
    ├── robots.ts, sitemap.ts
    ├── api/contact/route.ts      # envoi Resend, rate limit, honeypot
    └── [locale]/
        ├── layout.tsx            # <html lang>, métadonnées, scripts inline thème + accent (anti-flash), providers
        ├── page.tsx              # page unique (Server Component) : liste ordonnée des panneaux
        ├── globals.css           # directives Tailwind + couleurs de base (body, bordures, contours)
        ├── salimov.css           # tout le design Salimov (variables, sections, responsive, échelle)
        ├── blog/page.tsx, blog/[slug]/page.tsx
        ├── hooks/theme-context.tsx, hooks/useActiveSection.ts
        └── components/salimov/   # un composant par section + mécanique (HorizontalShell, HashScroll, Header, Reveal, Counter, Preloader, ColorSwitcher)
messages/en.json, messages/fr.json  # tous les textes (mêmes clés dans les deux fichiers)
public/                           # cv/ (PDF), files/ (photos), realisation/ (captures WebP des projets)
```

### Flux de la page d'accueil

1. `page.tsx` construit la liste des panneaux `{ id, kind: "dark" | "band", node }` dans l'ordre :
   home → about → facts* → services* → projects → testimonials* → contact → clients* → blog* → copyright
   (`*` = masquable via `siteConfig.sections`).
2. `HorizontalShell` les rend dans `#scroller`, chaque panneau avec `id` + `data-panel`, et ajoute les
   courbes de raccord entre un panneau `dark` et un `band` voisin.
3. `Header` reçoit les ids des panneaux `dark` (hors copyright) pour construire le menu ;
   `useActiveSection` détecte la section visible et réécrit l'ancre de l'URL (`history.replaceState`).
4. `HashScroll` place la page au chargement (position sauvegardée après changement de langue, sinon ancre).

## 6. Où modifier quoi

| Je veux… | Fichier |
|---|---|
| masquer une section | `src/config/site.ts` → `sections` |
| e-mail, téléphone, date de naissance, liste des clients | `src/config/site.ts` |
| textes (toutes langues) | `messages/en.json` **et** `messages/fr.json` |
| ajouter un projet | `components/salimov/Portfolio.tsx` (tableau `projects`) + textes `ProjectsSection.projects.<key>` + capture WebP ≈ 1300 px dans `public/realisation/` |
| expériences du parcours | `components/salimov/About.tsx` (`experienceKeys`) + `AboutSection.experiences.<key>` |
| compétences | `components/salimov/skills.tsx` (ordre = CV) |
| réseaux sociaux | `components/salimov/social.tsx` |
| chiffres clés | `AboutSection.stats.*.value` dans les messages |
| publier un article | `src/content/posts.ts` (`placeholder: false` + `date`) |
| couleurs, mise en page, responsive | `src/app/[locale]/salimov.css` |
| CV téléchargeable | `public/cv/CV-de-Romaric-AKODJENOU.pdf` |

## 7. Règles et pièges à connaître

- **Langue du projet : français** (commentaires, messages de commit, documentation). Commits courts,
  à l'impératif ou descriptifs, comme dans l'historique.
- **Toujours modifier `en.json` et `fr.json` ensemble** : les clés doivent rester identiques.
- **Navigation interne** : utiliser `Link` / `useRouter` / `usePathname` de `@/i18n/navigation`, jamais `next/link`.
- **Défilement** : ne jamais coder un `window.scrollTo` à la main pour aller à une section ;
  passer par `scrollToSection()` de `src/lib/scroll.ts` (gère horizontal/vertical et stoppe le défilement fluide).
  La condition « mode horizontal » est **uniquement** `DESKTOP_QUERY` = `(min-width: 1025px) and (hover: hover)` ;
  le CSS utilise la même media query, les garder synchronisées.
- Tout nouveau panneau doit passer par la liste de `page.tsx` (il reçoit `id` + `data-panel`) ;
  sinon ni le menu, ni l'ancre, ni la restauration de position ne le voient.
- **Composants serveur par défaut** : `'use client'` seulement pour les composants interactifs.
- **Thème** : la source de vérité est la classe `dark` sur `<html>`, posée par le script inline du layout.
  Un changement de langue recrée `<html>` → `ThemeProvider` réapplique thème et accent dans un `useLayoutEffect`.
  Ne pas casser ce mécanisme (flash ou perte du thème au changement de langue).
- **Stockage navigateur** : toujours entouré de `try/catch` (navigation privée).
- **Formulaire** : les règles de validation vivent dans `src/lib/contact.ts` ; modifier là, pas en double.
  L'e-mail est envoyé en **texte brut** — ne pas introduire de HTML venant du visiteur.
- **Images** : WebP, servies par `next/image`. Garder `public/` léger (≈ 1,1 Mo actuellement).
- **Secrets** : `.env*` est ignoré par Git ; ne jamais committer de clé.
- Accessibilité : `aria-label` sur les boutons-icônes, `prefers-reduced-motion` respecté.

## 8. État actuel (au 2026-10-03)

**Fait** : refonte Salimov complète (toutes les sections, navigation horizontale, URL par section,
écran de chargement, responsive mobile/tablette/bureau étroit, mise à l'échelle), formulaire de contact
fonctionnel, pages du blog, sélecteur d'accent, socle SEO/i18n, sécurité des dépendances, nettoyage
des images, changement de langue instantané, contenu aligné sur le nouveau CV (compétences, compteurs
« +9 projets », « +4 clients », « +2 années d'expérience »). Nettoyage des restes de l'ancienne version (Aceternity / shadcn) le 2026-10-03.

**Branches** : `master` (principale), branche de travail actuelle `claude/eager-carson-jpgevo`.

**Reste à faire** (voir aussi `ROADMAP.md`) :
- [ ] Tester sur de vrais appareils (iPhone, iPad, Android) : rendu et gestes.
- [ ] Remplacer les articles « à venir » du blog par de vrais articles.
- [ ] Remplacer les témoignages d'exemple par de vrais témoignages.
- [ ] Renseigner `RESEND_API_KEY` (et un domaine vérifié pour `CONTACT_FROM_EMAIL`) en production.
- [ ] Confirmer l'affichage public du numéro de téléphone.

**Problèmes / restes connus** (constatés à l'analyse du 2026-10-03, non corrigés) :
- `npm audit` : 8 vulnérabilités « high » (`braces` / `micromatch` / `fast-glob`), uniquement dans les
  outils de développement (Tailwind 3, `eslint-config-next`) ; aucune dans le code livré. La correction
  proposée (`--force`) casse les versions : à traiter lors d'une montée vers Tailwind 4.
- La limite de débit du formulaire est en mémoire : elle n'est pas partagée entre instances serverless.
- Si `tsc` signale des fichiers introuvables sous `.next/`, c'est un cache périmé : supprimer `.next/`.

---

## Mise à jour du rapport

À la fin de **chaque opération validée** (fonctionnalité, correction, refactor, changement de contenu),
l'agent doit, dans le même commit ou juste après :

1. Mettre à jour les sections concernées ci-dessus (fonctionnalités, architecture, « où modifier quoi »,
   règles, **état actuel** : cocher / ajouter / retirer les points, déplacer les problèmes résolus).
2. Mettre à jour la date de la section 8 et le dernier commit de référence.
3. Ajouter une ligne au journal ci-dessous (la plus récente en haut), format :
   `- AAAA-MM-JJ — <résumé de l'opération> (<fichiers ou zones touchés>)`.
4. Si `README.md` ou `ROADMAP.md` deviennent faux, les corriger aussi.

### Journal

- 2026-10-03 — Nettoyage des restes de l'ancienne version : notes `Portfolio - *.md`, `components.json`,
  `src/lib/utils.ts` (Home appelle `scrollToSection`), clé `ScrollToTop`, image distante Aceternity,
  thème/plugins Tailwind et variables shadcn (couleurs de base conservées à l'identique), dépendances
  `clsx`, `tailwind-merge`, `tailwindcss-animate`, `mini-svg-data-uri`. `node_modules` resynchronisé (`npm ci`).
  Lint, `tsc` et build OK ; CSS Salimov compilé identique (CLAUDE.md, configs, globals.css, messages, package.json).
- 2026-10-03 — Création de CLAUDE.md : analyse complète du projet, état des lieux et problèmes connus (CLAUDE.md).
