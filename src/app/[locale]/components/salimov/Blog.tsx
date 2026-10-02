import { useTranslations } from "next-intl";
import { posts } from "@/content/posts";
import Reveal from "./Reveal";
import PostCard from "./PostCard";

export default function Blog() {
  const t = useTranslations("BlogSection");

  return (
    <section className="sal-section">
      <div className="sal-title">
        <Reveal as="h3" from="left">{t("title")}</Reveal>
      </div>
      <ul className="sal-posts">
        {posts.slice(0, 3).map((post, i) => (
          <Reveal as="li" className="sal-post" key={post.slug} delay={0.12 * i}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
