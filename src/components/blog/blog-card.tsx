import type { BlogPost } from '@/lib/blog';
import { Link } from '@tanstack/react-router';
import { formatDate } from '@/lib/formatter';

export function BlogCard({ post }: { post: BlogPost }) {
  const { slug } = post;

  return (
    <Link to="/blog/$slug" params={{ slug }} className="group block h-full">
      <article className="serif-card serif-card-accent serif-card-hover flex h-full flex-col overflow-hidden">
        {post.image && (
          <div className="aspect-video w-full overflow-hidden border-b border-[var(--serif-border)] bg-[var(--serif-muted)]">
            <img
              src={post.image}
              alt={post.title}
              className="size-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </div>
        )}
        <div className="flex h-full flex-col p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="serif-meta capitalize">{post.category}</span>
            <span className="serif-meta">
              {formatDate(new Date(post.date))}
            </span>
          </div>
          <div className="mt-4 flex-1 space-y-3">
            <h3 className="line-clamp-2 text-2xl leading-tight transition-colors duration-200 group-hover:text-[var(--serif-accent)]">
              {post.title}
            </h3>
            {post.description && (
              <p className="line-clamp-3 text-lg leading-relaxed text-[var(--serif-muted-foreground)]">
                {post.description}
              </p>
            )}
          </div>
          <span className="serif-link mt-5 inline-flex items-center text-sm font-medium tracking-[0.06em] uppercase">
            Read Article
          </span>
        </div>
      </article>
    </Link>
  );
}
