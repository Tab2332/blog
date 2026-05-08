import Container from '@/components/layout/container';
import { Link } from '@tanstack/react-router';
import { websiteConfig } from '@/config/website';

const footerLinks = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '全部文章' },
  { href: '/#about', label: '关于我' },
];

export function BlogFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--serif-border)] px-4 py-16">
      <Container className="max-w-5xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-end">
          <div>
            <p className="serif-label">Closing Notes</p>
            <p className="mt-4 max-w-2xl text-3xl leading-tight md:text-4xl">
              写一点真实、克制但有温度的内容。
            </p>
            <p className="mt-4 max-w-2xl text-lg text-[var(--serif-muted-foreground)]">
              这是一份偏编辑感的个人博客，持续记录技术、产品和生活里的思考。
            </p>
          </div>

          <nav
            aria-label="Footer links"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            {footerLinks.map((item) =>
              item.href.startsWith('/#') ? (
                <a key={item.href} href={item.href} className="serif-link">
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} to={item.href} className="serif-link">
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--serif-border)] pt-6 text-sm text-[var(--serif-muted-foreground)] md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {websiteConfig.metadata?.name}
          </span>
          <span className="serif-label text-[10px] text-[var(--serif-muted-foreground)]">
            All rights reserved
          </span>
        </div>
        <div className="mt-6 serif-rule" />
        <div className="mt-3 text-xs tracking-[0.12em] text-[var(--serif-muted-foreground)] uppercase">
          Crafted in editorial serif style
        </div>
      </Container>
    </footer>
  );
}
