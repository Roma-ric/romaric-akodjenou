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
- [ ] Page article du blog (`/blog` et `/blog/[slug]`)
- [x] Contact : cartes Salimov (téléphone, adresse, e-mail, réseaux)
- [ ] Contact : formulaire fonctionnel (choisir le service d'envoi)
- [x] Séparateurs en courbe entre sections et bandeaux
- [ ] Sélecteur de couleur d'accent (réservé au propriétaire)
- [x] Menu : en-tête Salimov (menu, e-mail, langue, thème) et menu mobile

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
- [ ] Brancher le formulaire de contact (envoi réel, validation, retour utilisateur)
- [x] Statistiques : utiliser `stats.*.value` des traductions au lieu des valeurs en dur (`About.tsx`)
- [ ] Blog : remplir la page `/[locale]/blog` ou la supprimer ; retirer les témoignages *lorem ipsum*
- [x] Traduire les textes de fond des sections (« LET'S TALK », « WORKS », « OFFERINGS »…)
- [x] Utiliser le `Link` de `src/i18n/navigation.ts` au lieu de `next/link`

## 4. Performance
- [ ] (images servies via `next/image` ; reste à convertir/alléger les sources) Convertir les captures `public/realisation` en WebP/AVIF et passer à `next/image`
- [ ] Sortir `public/maquette`, les `desktop.ini` et les images non utilisées de `public/`
- [x] Supprimer le flash de thème au chargement (script inline ou `next-themes`)

## 5. Qualité du code
- [x] Remplacer le script `next lint` par `eslint .` et aligner `eslint-config-next` sur Next 16
- [x] Factoriser `About.tsx` (expériences et compétences générées à partir de données)
- [x] Supprimer le code mort (bloc commenté de `page.tsx`, icône « settings » cachée, `<img>` dupliquées du Hero)
- [x] Nettoyer les classes Tailwind contradictoires (Contact)
- [ ] Supprimer les breakpoints personnalisés `scr_*` de `tailwind.config.ts` (plus utilisés)
- [ ] Rédiger un vrai `README.md`

## 6. Accessibilité et vie privée
- [x] Ajouter des `aria-label` aux liens-icônes, menus et au sélecteur de thème
- [x] Date de naissance remplacée par l'âge ; numéro de téléphone conservé (à confirmer)
