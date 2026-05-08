import { Link } from '@tanstack/react-router';
import { messages } from '@/messages';

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav
      className="mt-14 flex flex-wrap items-center justify-center gap-3"
      aria-label="Blog pagination"
    >
      {currentPage > 1 ? (
        <Link
          to="/blog"
          search={prevPage <= 1 ? { page: undefined } : { page: prevPage }}
          className="serif-button serif-button-secondary min-w-[96px] text-sm uppercase tracking-[0.08em]"
        >
          {messages.blog.previous}
        </Link>
      ) : (
        <span className="inline-flex min-h-[44px] min-w-[96px] cursor-not-allowed items-center justify-center rounded-md border border-[var(--serif-border)] px-4 py-2 text-sm uppercase tracking-[0.08em] text-[var(--serif-muted-foreground)] opacity-70">
          {messages.blog.previous}
        </span>
      )}
      <span className="serif-meta rounded-md border border-[var(--serif-border)] bg-[var(--serif-muted)] px-4 py-2">
        {messages.blog.page} {currentPage} {messages.blog.of} {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          to="/blog"
          search={{ page: nextPage }}
          className="serif-button serif-button-secondary min-w-[96px] text-sm uppercase tracking-[0.08em]"
        >
          {messages.blog.next}
        </Link>
      ) : (
        <span className="inline-flex min-h-[44px] min-w-[96px] cursor-not-allowed items-center justify-center rounded-md border border-[var(--serif-border)] px-4 py-2 text-sm uppercase tracking-[0.08em] text-[var(--serif-muted-foreground)] opacity-70">
          {messages.blog.next}
        </span>
      )}
    </nav>
  );
}
