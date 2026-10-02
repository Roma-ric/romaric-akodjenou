# Roadmap – prochaine version

Corrections issues de l'audit du portfolio, à traiter au fil du développement de la prochaine version.
Cocher chaque point une fois corrigé.

## 1. Sécurité
- [ ] Mettre à jour `next` (vulnérabilité critique) et lancer `npm audit fix` (12 vulnérabilités, dont `next-intl` et `postcss`)
- [ ] Ignorer `.env*` dans `.gitignore` et retirer `.env` du suivi Git

## 2. SEO
- [ ] Rendre `page.tsx` côté serveur (garder `'use client'` uniquement dans les composants interactifs)
- [ ] Remplacer `next/head` par l'export `metadata` / `generateMetadata` dans `layout.tsx`
- [ ] `<html lang>` dynamique selon la langue (`params.locale`)
- [ ] Compléter les métadonnées (Open Graph, `sitemap`, `robots`) et supprimer `metadata.ts` vide
- [ ] Ajouter `generateStaticParams` et `setRequestLocale` pour pré-rendre `/en` et `/fr`

## 3. Fonctionnalités
- [ ] Brancher le formulaire de contact (envoi réel, validation, retour utilisateur)
- [ ] Statistiques : utiliser `stats.*.value` des traductions au lieu des valeurs en dur (`About.tsx`)
- [ ] Blog : remplir la page `/[locale]/blog` ou la supprimer ; retirer les témoignages *lorem ipsum*
- [ ] Traduire les textes de fond des sections (« LET'S TALK », « WORKS », « OFFERINGS »…)
- [ ] Utiliser le `Link` de `src/i18n/navigation.ts` au lieu de `next/link`

## 4. Performance
- [ ] Convertir les captures `public/realisation` en WebP/AVIF et passer à `next/image`
- [ ] Sortir `public/maquette`, les `desktop.ini` et les images non utilisées de `public/`
- [ ] Supprimer le flash de thème au chargement (script inline ou `next-themes`)

## 5. Qualité du code
- [ ] Remplacer le script `next lint` par `eslint .` et aligner `eslint-config-next` sur Next 16
- [ ] Factoriser `About.tsx` (expériences et compétences générées à partir de données)
- [ ] Supprimer le code mort (bloc commenté de `page.tsx`, icône « settings » cachée, `<img>` dupliquées du Hero)
- [ ] Nettoyer les classes Tailwind contradictoires (Contact)
- [ ] Renommer les breakpoints personnalisés (`scr_*`) de façon sémantique
- [ ] Rédiger un vrai `README.md`

## 6. Accessibilité et vie privée
- [ ] Ajouter des `aria-label` aux liens-icônes, menus et au sélecteur de thème
- [ ] Décider de l'affichage de la date de naissance complète et du numéro de téléphone
