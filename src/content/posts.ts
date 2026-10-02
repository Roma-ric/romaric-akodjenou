// Articles du blog. Pour publier : ajouter un objet, passer `placeholder` à false
// et renseigner `date` (AAAA-MM-JJ). Les articles « placeholder » s'affichent
// comme « bientôt disponible » et ne sont ni indexés ni dans le sitemap.
type Localized<T> = { en: T; fr: T };

export type Post = {
  slug: string;
  placeholder: boolean;
  date?: string;
  category: Localized<string>;
  title: Localized<string>;
  excerpt: Localized<string>;
  body: Localized<string[]>;
};

export const posts: Post[] = [
  {
    slug: "premier-article",
    placeholder: true,
    category: { en: "design", fr: "design" },
    title: { en: "Article coming soon", fr: "Article à venir" },
    excerpt: {
      en: "A first post about front-end development is on its way. Stay tuned.",
      fr: "Un premier article sur le développement front-end arrive bientôt.",
    },
    body: {
      en: ["This article is not written yet. Come back soon!"],
      fr: ["Cet article n'est pas encore rédigé. Revenez bientôt !"],
    },
  },
  {
    slug: "retours-d-experience",
    placeholder: true,
    category: { en: "development", fr: "développement" },
    title: { en: "Article coming soon", fr: "Article à venir" },
    excerpt: {
      en: "Notes and lessons learned from real-world web projects.",
      fr: "Notes et enseignements tirés de projets web concrets.",
    },
    body: {
      en: ["This article is not written yet. Come back soon!"],
      fr: ["Cet article n'est pas encore rédigé. Revenez bientôt !"],
    },
  },
  {
    slug: "interfaces-rapides-et-accessibles",
    placeholder: true,
    category: { en: "essentials", fr: "essentiel" },
    title: { en: "Article coming soon", fr: "Article à venir" },
    excerpt: {
      en: "Tips for building fast, accessible and maintainable interfaces.",
      fr: "Conseils pour des interfaces rapides, accessibles et maintenables.",
    },
    body: {
      en: ["This article is not written yet. Come back soon!"],
      fr: ["Cet article n'est pas encore rédigé. Revenez bientôt !"],
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const publishedPosts = () => posts.filter((p) => !p.placeholder);
