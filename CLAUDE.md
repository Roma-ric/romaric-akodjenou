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
- **Pas de langue dans l'adresse** : `/`, `/blog`, `/blog/<slug>`. Le middleware choisit la langue d'après
  le cookie `NEXT_LOCALE` (1 an), sinon le navigateur (`Accept-Language`), sinon l'anglais. Les anciennes
  adresses `/fr/...` et `/en/...` redirigent vers `/...` en mémorisant la langue.
- **Une ancre par section** (`/#about`, `/#contact`…) : l'ancre suit le défilement, les liens directs
  fonctionnent.
- **Mise à l'échelle** : sur grand écran, toute la mise en page (en `rem`) suit la hauteur de fenêtre.
- **Thème clair / sombre** mémorisé (`localStorage.theme`), appliqué avant le premier rendu (pas de flash).
- **Changement de langue sur place** (`src/i18n/LocaleProvider.tsx`) : un seul bouton (« FR » / « EN »,
  la langue proposée), aucune navigation ni requête serveur. Les textes sont remplacés dans la page affichée
  (textes de l'autre langue préchargés) ; formulaire, carrousel et animations déjà jouées sont conservés ;
  l'élément au centre de l'écran est repéré puis recalé au pixel près (`captureScrollAnchor` /
  `restoreScrollAnchor`). Met aussi à jour `<html lang>`, le titre/description de l'onglet et le cookie.
- **Outils de l'en-tête** (langue, thème) rendus une seule fois : dans la barre sur ordinateur, fixés en haut
  à droite à côté du bouton menu sur mobile/tablette (visibles même menu ouvert). Barre collante sur le blog.
- **Écran de chargement** en CSS pur (joué une seule fois par page).
- **Carrousel de projets** (Framer Motion, respecte `prefers-reduced-motion`).
- **Compteurs animés** et apparitions au défilement (`Reveal`, `Counter`).
- **Formulaire de contact** → `POST /api/contact` → envoi d'un e-mail texte brut via l'API **Resend**.
  Validation partagée client/serveur, champ piège anti-robots, limite 5 messages / 10 min / IP
  (en mémoire, par instance). Sans `RESEND_API_KEY` : réponse 503 et repli « Écrivez-moi par e-mail ».
- **Blog** : `/blog` et `/blog/[slug]`, articles statiques dans `src/content/posts.ts`.
  Les articles `placeholder` ne sont ni indexés ni dans le sitemap.
- **SEO** : `generateMetadata` (titre, description, Open Graph, canonical sans langue), `sitemap.xml`
  (une adresse par page), `robots.txt`, `<html lang>` dynamique, pré-rendu statique des deux langues
  (routes internes `/en`, `/fr`, servies par réécriture du middleware). Limite assumée : une seule adresse
  pour deux langues, les moteurs indexent surtout l'anglais (pas de `hreflang` possible).
- **Âge calculé** depuis la date de naissance ; la page d'accueil est régénérée chaque jour (`revalidate = 86400`).
- **Panneau de personnalisation** réservé au propriétaire (`components/OwnerPanel.tsx`, styles dans
  `globals.css`, indépendants du modèle) :
  - **couleur d'accent** (9 teintes), avec `NEXT_PUBLIC_COLOR_SWITCHER=true`, mémorisée dans le navigateur
    (`localStorage["sal-accent"]`) ;
  - **modèle de mise en page**, avec `NEXT_PUBLIC_TEMPLATE_SWITCHER=true`, mémorisé dans le cookie
    `portfolio-template` (1 an) puis `router.refresh()`. Ce drapeau rend la page d'accueil dynamique
    (lecture du cookie) : à réserver au local / à la préproduction. Sans lui, la page reste statique avec
    `siteConfig.template`.
- **Modèles** (`src/config/templates.ts`) : « Classique » (`classic`, la version Salimov en ligne) ;
  « Atelier » (`atelier`) en préparation (`ready: false` : affiché « bientôt », non sélectionnable).

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
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start
npm run lint     # eslint .
npx tsc --noEmit # vérification des types (pas de script dédié)
```

Variables d'environnement : copier `.env.example` vers `.env.local` (jamais committé).
`NEXT_PUBLIC_APP_LINK`, `NEXT_PUBLIC_COLOR_SWITCHER`, `NEXT_PUBLIC_TEMPLATE_SWITCHER`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
`CONTACT_FROM_EMAIL`, `RESEND_API_URL` (facultatif). Détail dans `README.md`.

## 5. Architecture

```
src/
├── proxy.ts                      # middleware next-intl (Next 16 : « proxy »), exclut api/_next/fichiers
├── i18n/                         # routing (locales, sans préfixe, cookie), request (messages), navigation (Link…),
│                                 # LocaleProvider (changement de langue sur place)
├── config/
│   ├── site.ts                   # modèle publié, sections affichées, e-mail, téléphone, date de naissance, clients, getAge()
│   ├── templates.ts              # liste des modèles (id, ready), cookie du choix, isReadyTemplate(), saveTemplateChoice()
│   └── accents.ts                # palette d'accent, applyAccent(), foregroundFor()
├── content/posts.ts              # articles du blog (contenu localisé en dur)
├── lib/
│   ├── scroll.ts                 # cœur de la navigation : DESKTOP_QUERY, scrollToSection, section visible, ancrage au changement de langue
│   └── contact.ts                # validation du formulaire (partagée client/serveur)
└── app/
    ├── robots.ts, sitemap.ts
    ├── api/contact/route.ts      # envoi Resend, rate limit, honeypot
    └── [locale]/
        ├── layout.tsx            # <html lang>, métadonnées, scripts inline thème + accent (anti-flash), providers
        ├── page.tsx              # page unique (Server Component) : choisit le modèle, ajoute le panneau propriétaire
        ├── templates/ClassicTemplate.tsx # modèle « Classique » : liste ordonnée des panneaux Salimov
        ├── globals.css           # directives Tailwind + couleurs de base (body, bordures, contours)
        ├── salimov.css           # tout le design Salimov (variables, sections, responsive, échelle)
        ├── blog/page.tsx, blog/[slug]/page.tsx
        ├── hooks/theme-context.tsx, hooks/useActiveSection.ts
        ├── components/OwnerPanel.tsx # panneau propriétaire (accent + modèle), commun à tous les modèles
        └── components/salimov/   # un composant par section + mécanique (HorizontalShell, HashScroll, Header, Reveal, Counter, Preloader)
messages/en.json, messages/fr.json  # tous les textes (mêmes clés dans les deux fichiers)
public/                           # cv/ (PDF), files/ (photos), realisation/ (captures WebP des projets)
```

### Flux de la page d'accueil

0. `page.tsx` choisit le modèle (`siteConfig.template`, ou le cookie si `NEXT_PUBLIC_TEMPLATE_SWITCHER=true`)
   et lui passe le panneau propriétaire (`tools`). Les étapes suivantes décrivent le modèle « Classique ».
1. `templates/ClassicTemplate.tsx` construit la liste des panneaux `{ id, kind: "dark" | "band", node }` dans l'ordre :
   home → about → facts* → services* → projects → testimonials* → contact → clients* → blog* → copyright
   (`*` = masquable via `siteConfig.sections`).
2. `HorizontalShell` les rend dans `#scroller`, chaque panneau avec `id` + `data-panel`, et ajoute les
   courbes de raccord entre un panneau `dark` et un `band` voisin.
3. `Header` reçoit les ids des panneaux `dark` (hors copyright) pour construire le menu ;
   `useActiveSection` détecte la section visible et réécrit l'ancre de l'URL (`history.replaceState`).
4. `HashScroll` place la page au chargement sur la section de l'ancre (`/#contact`).

## 6. Où modifier quoi

| Je veux… | Fichier |
|---|---|
| masquer une section | `src/config/site.ts` → `sections` |
| modèle publié | `src/config/site.ts` → `template` |
| ajouter / activer un modèle | composant dans `src/app/[locale]/templates/`, entrée `renderers` de `page.tsx`, `ready: true` dans `src/config/templates.ts`, nom dans `OwnerPanel.templates.<id>` des messages |
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
- **Langue** : ne jamais changer de langue par navigation (`router.replace(..., { locale })`) : passer par
  `useLocaleSwitch().switchLocale()`. Tout texte affiché doit venir d'un **composant client** (`useTranslations`
  / `useLocale`), sinon il ne suivra pas le changement sur place. Les pages serveur ne gardent que
  `generateMetadata`, `generateStaticParams` et la vérification `notFound()`.
- **Clés React stables** : jamais un libellé traduit comme `key` (l'élément serait recréé au changement de
  langue et rejouerait son animation) ; utiliser un identifiant.
- **Dates** : formater avec `timeZone: "UTC"` (même jour côté serveur et navigateur, pas d'erreur d'hydratation).
- **Défilement** : ne jamais coder un `window.scrollTo` à la main pour aller à une section ;
  passer par `scrollToSection()` de `src/lib/scroll.ts` (gère horizontal/vertical et stoppe le défilement fluide).
  La condition « mode horizontal » est **uniquement** `DESKTOP_QUERY` = `(min-width: 1025px) and (hover: hover)` ;
  le CSS utilise la même media query, les garder synchronisées.
- Tout nouveau panneau du modèle Classique doit passer par la liste de `templates/ClassicTemplate.tsx` (il reçoit `id` + `data-panel`) ;
  sinon ni le menu ni l'ancre ne le voient.
- Les sections sont des composants client (pour suivre la langue) ; ce qui dépend du jour (âge) est calculé
  dans `page.tsx` (serveur, régénéré chaque jour) et passé en prop, pour éviter un écart à l'hydratation.
- **Thème** : la source de vérité est la classe `dark` sur `<html>`, posée par le script inline du layout.
  Une navigation qui change le segment `[locale]` recrée `<html>` → `ThemeProvider` réapplique thème et
  accent dans un `useLayoutEffect`. Ne pas casser ce mécanisme (flash ou perte du thème).
- **Stockage navigateur** : toujours entouré de `try/catch` (navigation privée).
- **Formulaire** : les règles de validation vivent dans `src/lib/contact.ts` ; modifier là, pas en double.
  L'e-mail est envoyé en **texte brut** — ne pas introduire de HTML venant du visiteur.
- **Images** : WebP, servies par `next/image`. Garder `public/` léger (≈ 1,1 Mo actuellement).
- **Secrets** : `.env*` est ignoré par Git ; ne jamais committer de clé.
- Accessibilité : `aria-label` sur les boutons-icônes, `prefers-reduced-motion` respecté.

## 8. État actuel (au 2026-10-04)

**Fait** : refonte Salimov complète (toutes les sections, navigation horizontale, URL par section,
écran de chargement, responsive mobile/tablette/bureau étroit, mise à l'échelle), formulaire de contact
fonctionnel, pages du blog, sélecteur d'accent, socle SEO/i18n, sécurité des dépendances, nettoyage
des images, changement de langue instantané, contenu aligné sur le nouveau CV (compétences, compteurs
« +9 projets », « +4 clients », « +2 années d'expérience »). Nettoyage des restes de l'ancienne version
(Aceternity / shadcn), changement de langue sur place sans langue dans l'adresse, bouton de langue unique
et outils fixes sur mobile, logos TypeScript / Zustand officiels (monochromes), parcours du plus récent au plus ancien
(2026-10-03). Choix du modèle de mise en page réservé au propriétaire, page actuelle devenue le modèle
« Classique » (2026-10-04).

**Branches** : `master` (principale), branche de travail actuelle `claude/eager-carson-jpgevo`.

**Reste à faire** (voir aussi `ROADMAP.md`) :
- [ ] Modèle « Atelier » : maquettes en cours de validation, puis intégration et `ready: true`.
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

- 2026-10-04 — Choix du modèle de mise en page : `src/config/templates.ts` (Classique prêt, Atelier en
  préparation), `siteConfig.template`, page actuelle déplacée dans `templates/ClassicTemplate.tsx`,
  `ColorSwitcher` remplacé par `OwnerPanel` (accent + modèle, styles dans `globals.css`), drapeau
  `NEXT_PUBLIC_TEMPLATE_SWITCHER` (cookie `portfolio-template`). Vérifié : build statique sans drapeau,
  route dynamique avec ; panneau testé dans Chromium (FR/EN, Atelier non sélectionnable, cookie invalide ignoré).

- 2026-10-03 — Logo Zustand : la mascotte en couleurs est remplacée par le logo officiel monochrome (devicon),
  servi depuis `public/logos/zustand.svg` et teint par masque CSS (`.sal-skill-mask`) pour suivre la couleur
  du thème comme les autres icônes (skills.tsx, salimov.css).

- 2026-10-03 — Langue : changement sur place sans navigation (`LocaleProvider`, ancrage du défilement), plus
  de langue dans l'adresse (`localePrefix: "never"`, cookie 1 an, anciennes adresses redirigées), sitemap et
  canonical sans langue, sections et pages du blog passées en composants client, clés React stables.
  En-tête : bouton de langue unique, outils (langue, thème) rendus une fois et fixés sur mobile, barre du blog
  collante. Flèche de la Home vers le bas sur mobile/tablette, logo TypeScript officiel (suit le thème),
  mascotte officielle Zustand (remplacée ensuite, voir plus haut), parcours trié (postes en cours,
  puis date de fin). Vérifié dans Chrome (ordinateur et mobile) : même document, aucune requête, élément
  regardé immobile, formulaire conservé.

- 2026-10-03 — Nettoyage des restes de l'ancienne version : notes `Portfolio - *.md`, `components.json`,
  `src/lib/utils.ts` (Home appelle `scrollToSection`), clé `ScrollToTop`, image distante Aceternity,
  thème/plugins Tailwind et variables shadcn (couleurs de base conservées à l'identique), dépendances
  `clsx`, `tailwind-merge`, `tailwindcss-animate`, `mini-svg-data-uri`. `node_modules` resynchronisé (`npm ci`).
  Lint, `tsc` et build OK ; CSS Salimov compilé identique (CLAUDE.md, configs, globals.css, messages, package.json).
- 2026-10-03 — Création de CLAUDE.md : analyse complète du projet, état des lieux et problèmes connus (CLAUDE.md).
