import { PersonalHomePage } from '@/components/blog/personal-home-page';
import { websiteConfig } from '@/config/website';
import { getSortedPosts } from '@/lib/blog';
import { seo } from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/urls';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  head: () => {
    const name = websiteConfig.metadata?.name ?? '';
    const title = websiteConfig.metadata?.title ?? '';
    const description = websiteConfig.metadata?.description ?? '';
    const url = getCanonicalUrl('/');
    const webSiteJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name,
      description,
      url,
    };
    const metadata = seo('/', { title, description });
    return {
      ...metadata,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(webSiteJsonLd),
        },
      ],
    };
  },
  loader: () => ({
    featuredPosts: getSortedPosts().slice(0, 3),
  }),
  component: HomePageRoute,
});

function HomePageRoute() {
  const { featuredPosts } = Route.useLoaderData();

  return <PersonalHomePage featuredPosts={featuredPosts} />;
}
