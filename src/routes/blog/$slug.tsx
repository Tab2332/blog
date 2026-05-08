import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import Container from '@/components/layout/container';
import { Markdown } from '@/components/markdown/markdown';
import { serifDesign } from '@/components/blog/serif-design';
import { getPostBySlug } from '@/lib/blog';
import { websiteConfig } from '@/config/website';
import { messages } from '@/messages';
import { getCanonicalUrl, getImageUrl } from '@/lib/urls';
import { seo } from '@/lib/seo';
import { IconArrowLeft } from '@tabler/icons-react';
import { formatDate } from '@/lib/formatter';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    const post = loaderData;
    if (!post) return {};
    const path = `/blog/${params.slug}`;
    const title = `${post.title} | ${websiteConfig.metadata?.name}`;
    const description =
      post.description ?? websiteConfig.metadata?.description ?? '';
    const image = post.image ? getImageUrl(post.image) : undefined;
    const metadata = seo(path, {
      title,
      description,
      image,
      type: 'article',
    });
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description,
      ...(image && { image }),
      datePublished: new Date(post.date).toISOString(),
      url: getCanonicalUrl(path),
      publisher: {
        '@type': 'Organization',
        name: websiteConfig.metadata?.name ?? '',
      },
    };
    return {
      ...metadata,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(articleJsonLd),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  if (!post || !websiteConfig.blog?.enable) throw notFound();

  return (
    <Container className="max-w-5xl px-6 pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          to="/blog"
          search={{ page: 1 }}
          className="serif-button serif-button-secondary"
        >
          <IconArrowLeft className="size-4" />
          {messages.blog.allPosts}
        </Link>

        <article className="space-y-10">
          <header className="space-y-6 border-b border-[var(--serif-border)] pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="serif-meta capitalize">{post.category}</span>
              <span className="serif-meta">
                {formatDate(new Date(post.date))}
              </span>
            </div>

            <h1 className="text-[2.25rem] leading-[1.15] md:text-[3.5rem]">
              {post.title}
            </h1>

            {post.description && (
              <p className="max-w-3xl text-lg leading-relaxed text-[var(--serif-muted-foreground)] md:text-2xl">
                {post.description}
              </p>
            )}

            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full border border-[var(--serif-border)] object-cover"
                style={{
                  borderRadius: serifDesign.radius.lg,
                  boxShadow: serifDesign.shadow.md,
                }}
              />
            ) : null}
          </header>

          <div>
            <Markdown
              content={post.content}
              className="serif-prose prose prose-neutral max-w-none"
            />
          </div>

          <div className="border-t border-[var(--serif-border)] pt-6">
            <Link
              to="/blog"
              search={{ page: 1 }}
              className="serif-link inline-flex items-center gap-2 text-sm tracking-[0.08em] uppercase"
            >
              <IconArrowLeft className="size-4" />
              {messages.blog.allPosts}
            </Link>
          </div>
        </article>
      </div>
    </Container>
  );
}
