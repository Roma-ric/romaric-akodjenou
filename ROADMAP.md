# Roadmap – prochaine version

Corrections issues de l'audit du portfolio, à traiter au fil du développement de la prochaine version.
Cocher chaque point une fois corrigé.

## Décisions – refonte inspirée de Salimov

Modèle de référence : template « Salimov – Horizontal Personal Portfolio » (dépôt `Roma-ric/salimov-template`).
La structure et l'esprit sont reproduits avec la stack actuelle (Next.js, Tailwind, Framer Motion), sans copier le CSS ni les images du template.

- **Navigation** : défilement horizontal sur ordinateur, vertical sous 1024 px, avec une URL par section
- **Thème** : mode clair/sombre conservé, bilingue FR/EN conservé
- **Couleur d'accent** : sélecteur de couleur développé, mais réservé au propriétaire et caché sur le site public
- **Sections** : Home, About (infos, compétences, CV), Facts, Services, Portfolio, Testimonials, Contact, Clients, Blog et page article, Copyright ; toutes construites, les sections sans contenu pourront être masquées à la fin

## Refonte Salimov – avancement
- [x] Navigation horizontale sur ordinateur (conteneur, molette, barre de progression), vertical sous 1024 px
- [x] URL par section (`#about`, `#contact`…), liens directs et bouton retour du navigateur
- [x] Écran de chargement (CSS pur)
- [x] Section Home : grand titre animé, accroche, bouton rond
- [x] Section About : mise en page Salimov (infos, compétences en losanges, parcours en frise)
- [x] Section Facts (compteurs en losanges sur bandeau)
- [x] Section Portfolio en carrousel (fiche projet à côté du visuel)
- [x] Sections Services, Testimonials, Clients, Blog (contenu d'exemple à remplacer)
- [x] Pages du blog (`/blog` et `/blog/[slug]`, articles dans `src/content/posts.ts`)
- [x] Contact : cartes Salimov (téléphone, adresse, e-mail, réseaux)
- [x] Contact : formulaire fonctionnel (route `/api/contact`, envoi via Resend : il reste à renseigner `RESEND_API_KEY`)
- [x] Séparateurs en courbe entre sections et bandeaux
- [x] Sélecteur de couleur d'accent (visible seulement avec `NEXT_PUBLIC_COLOR_SWITCHER=true`)
- [x] Choix du modèle de mise en page (visible seulement avec `NEXT_PUBLIC_TEMPLATE_SWITCHER=true`, modèle public dans `siteConfig.template`)
- [x] Modèle « Atelier » intégré et sélectionnable (`src/app/[locale]/templates/atelier/`)
- [x] Atelier publié (`siteConfig.template = "atelier"`)
- [ ] Atelier : tester sur de vrais appareils
- [x] Menu : en-tête Salimov (menu, e-mail, langue, thème) et menu mobile

## Responsivité (comparée au template Salimov)
- [x] Mobile/tablette : Home centrée, marges latérales, courbes de raccord, connecteurs et icônes en filigrane dans le parcours, losanges des compteurs en colonne, infos sur deux colonnes
- [x] Mode horizontal réservé aux écrans > 1024 px avec pointeur (les tablettes tactiles restent en vertical)
- [x] En-tête sans collision entre 1025 et 1240 px (e-mail masqué, déjà dans Contact)
- [x] Mise à l'échelle selon la hauteur de la fenêtre (rem) : plus de chevauchement avec l'en-tête sur portable (testé 1181×640)
- [x] Défilement horizontal : molette partout (en-tête compris), unités Firefox, flèches du clavier, animation fluide
- [x] Cartes détachées du fond (contour + ombre), infos sous le nom, carrousel avec flèches/pastilles visibles, icônes sociales visibles au survol
- [ ] Tester sur de vrais appareils (iPhone, iPad, Android) : rendu et gestes

## 1. Sécurité
- [x] Mettre à jour `next` (vulnérabilité critique) et lancer `npm audit fix` (12 vulnérabilités, dont `next-intl` et `postcss`)
- [x] Ignorer `.env*` dans `.gitignore` et retirer `.env` du suivi Git

## 2. SEO
- [x] Rendre `page.tsx` côté serveur (garder `'use client'` uniquement dans les composants interactifs)
- [x] Remplacer `next/head` par l'export `metadata` / `generateMetadata` dans `layout.tsx`
- [x] `<html lang>` dynamique selon la langue (`params.locale`)
- [x] Compléter les métadonnées (Open Graph, `sitemap`, `robots`) et supprimer `metadata.ts` vide
- [x] Ajouter `generateStaticParams` et `setRequestLocale` pour pré-rendre `/en` et `/fr`

## 3. Fonctionnalités
- [x] Brancher le formulaire de contact (envoi réel, validation, retour utilisateur)
- [x] Statistiques : utiliser `stats.*.value` des traductions au lieu des valeurs en dur (`About.tsx`)
- [ ] Blog : remplacer les articles « à venir » par de vrais articles ; remplacer les témoignages d'exemple
- [x] Traduire les textes de fond des sections (« LET'S TALK », « WORKS », « OFFERINGS »…)
- [x] Utiliser le `Link` de `src/i18n/navigation.ts` au lieu de `next/link`

## 4. Performance
- [x] Captures `public/realisation` converties en WebP (5,5 Mo → 0,57 Mo) et servies via `next/image`
- [x] `public/maquette`, `desktop.ini` et fichiers non utilisés supprimés (`public/` : 8,3 Mo → 1,1 Mo)
- [x] Supprimer le flash de thème au chargement (script inline ou `next-themes`)

## 5. Qualité du code
- [x] Remplacer le script `next lint` par `eslint .` et aligner `eslint-config-next` sur Next 16
- [x] Factoriser `About.tsx` (expériences et compétences générées à partir de données)
- [x] Supprimer le code mort (bloc commenté de `page.tsx`, icône « settings » cachée, `<img>` dupliquées du Hero)
- [x] Nettoyer les classes Tailwind contradictoires (Contact)
- [x] Breakpoints personnalisés `scr_*` supprimés de `tailwind.config.ts`
- [x] Rédiger un vrai `README.md`

## 6. Accessibilité et vie privée
- [x] Ajouter des `aria-label` aux liens-icônes, menus et au sélecteur de thème
- [x] Date de naissance remplacée par l'âge ; numéro de téléphone conservé (à confirmer)
