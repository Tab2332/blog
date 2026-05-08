import { createFileRoute, notFound } from '@tanstack/react-router';
import Container from '@/components/layout/container';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogPagination } from '@/components/blog/blog-pagination';
import { SerifSectionLabel } from '@/components/blog/serif-section-label';
import { getPaginatedPosts } from '@/lib/blog';
import { websiteConfig } from '@/config/website';
import { messages } from '@/messages';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>) => ({
    page:
      typeof search.page === 'number'
        ? search.page
        : typeof search.page === 'string'
          ? Number(search.page) || undefined
          : undefined,
  }),
  loader: ({ location }) => {
    const page = Number(new URLSearchParams(location.search).get('page')) || 1;
    return getPaginatedPosts(page);
  },
  head: () =>
    seo('/blog', {
      title: `${messages.blog.title} | ${websiteConfig.metadata?.name}`,
      description: messages.blog.description,
    }),
  component: BlogListPage,
});

function BlogListPage() {
  const { posts, totalPages, currentPage } = Route.useLoaderData();
  if (!websiteConfig.blog?.enable) {
    throw notFound();
  }

  return (
    <Container className="max-w-5xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="space-y-8">
        <div className="mx-auto max-w-3xl">
          <SerifSectionLabel label="Journal" />
          <h1 className="text-center text-5xl leading-tight md:text-6xl">
            {messages.blog.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-[var(--serif-muted-foreground)] md:text-xl">
            {messages.blog.description}
          </p>
          <div className="mt-8 serif-rule" />
        </div>
        <BlogGrid posts={posts} />
        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Container>
  );
}
