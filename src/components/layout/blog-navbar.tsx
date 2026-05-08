import Container from '@/components/layout/container';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import { websiteConfig } from '@/config/website';

const links = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/#about', label: '关于我' },
];

export function BlogNavbar() {
  const pathname = useLocation().pathname;

  return (
    <header
      className="sticky inset-x-0 top-0 z-40 border-b border-[var(--serif-border)] backdrop-blur"
      style={{ backgroundColor: 'rgba(250, 250, 248, 0.94)' }}
    >
      <Container className="max-w-5xl px-6">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-6">
          <Link to="/" className="min-w-0">
            <p className="truncate text-2xl leading-none">
              {websiteConfig.metadata?.name}
            </p>
            <p className="serif-label mt-1 text-[10px] text-[var(--serif-muted-foreground)]">
              Personal Journal
            </p>
          </Link>

          <nav
            aria-label="Blog navigation"
            className="hidden items-center gap-5 md:flex"
          >
            {links.map((item) =>
              item.href.startsWith('/#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'serif-link text-sm font-medium tracking-[0.05em]',
                    pathname === '/' && 'text-[var(--serif-accent)]'
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'serif-link text-sm font-medium tracking-[0.05em]',
                    pathname === item.href && 'text-[var(--serif-accent)]'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <Link to="/blog" className="serif-button hidden md:inline-flex">
            阅读博客
          </Link>
        </div>

        <nav
          aria-label="Blog navigation mobile"
          className="flex items-center justify-between gap-3 pb-3 md:hidden"
        >
          {links.map((item) =>
            item.href.startsWith('/#') ? (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'serif-link text-sm tracking-[0.04em]',
                  pathname === '/' && 'text-[var(--serif-accent)]'
                )}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'serif-link text-sm tracking-[0.04em]',
                  pathname === item.href && 'text-[var(--serif-accent)]'
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <Link to="/blog" className="serif-button px-3 py-2 text-xs">
            阅读
          </Link>
        </nav>
      </Container>
    </header>
  );
}
