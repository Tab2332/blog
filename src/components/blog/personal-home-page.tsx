import { BlogCard } from '@/components/blog/blog-card';
import { SerifSectionLabel } from '@/components/blog/serif-section-label';
import Container from '@/components/layout/container';
import type { BlogPost } from '@/lib/blog';
import { Link } from '@tanstack/react-router';

type PersonalHomePageProps = {
  featuredPosts: BlogPost[];
};

export function PersonalHomePage({ featuredPosts }: PersonalHomePageProps) {
  return (
    <Container className="max-w-5xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
      <section className="mx-auto max-w-4xl text-center">
        <SerifSectionLabel
          label="Personal Notes"
          className="mx-auto max-w-2xl"
        />
        <h1 className="text-[2.5rem] leading-[1.1] md:text-7xl">
          你好，这里是一份偏文学感的个人博客。
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-[0.01em] text-[var(--serif-muted-foreground)] md:text-xl">
          我把技术复盘、项目经验和日常思考写成更耐读的长文，用更克制的排版让内容本身成为主角。
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/blog" className="serif-button w-full sm:w-auto">
            开始阅读
          </Link>
          <a
            href="/#about"
            className="serif-button serif-button-secondary w-full sm:w-auto"
          >
            关于我
          </a>
        </div>
      </section>

      <section className="mt-20 grid gap-8 md:mt-28 md:grid-cols-[1.3fr_0.7fr] md:items-start">
        <div className="serif-card serif-card-accent p-8 md:p-10">
          <p className="serif-label">Editorial Direction</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            我把博客做成一本慢读杂志。
          </h2>
          <p className="mt-5 text-lg leading-relaxed tracking-[0.01em] text-[var(--serif-muted-foreground)]">
            视觉尽量简洁，重点放在标题层级、阅读节奏和内容结构。希望你点开文章时，第一感受是安静、清晰、可信。
          </p>
          <div className="mt-8 serif-rule" />
          <div className="mt-6 grid gap-5 text-sm text-[var(--serif-muted-foreground)] md:grid-cols-2">
            <div>
              <p className="serif-label text-[10px] text-[var(--serif-muted-foreground)]">
                Tone
              </p>
              <p className="mt-2 text-base text-[var(--serif-foreground)]">
                Timeless · Warm · Refined
              </p>
            </div>
            <div>
              <p className="serif-label text-[10px] text-[var(--serif-muted-foreground)]">
                Reading Flow
              </p>
              <p className="mt-2 text-base text-[var(--serif-foreground)]">
                长文优先，强调结构化表达
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="serif-card p-7">
            <p className="serif-label text-[var(--serif-muted-foreground)]">
              Published
            </p>
            <p className="mt-4 text-6xl leading-none">{featuredPosts.length}</p>
            <p className="mt-4 text-base leading-relaxed text-[var(--serif-muted-foreground)]">
              篇最新文章，覆盖技术实践与产品思考。
            </p>
          </div>
          <div className="serif-card serif-card-accent p-7">
            <p className="serif-label text-[var(--serif-muted-foreground)]">
              Writing Rhythm
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--serif-foreground)]">
              坚持每周更新，用稳定节奏沉淀可复用的经验。
            </p>
            <div className="mt-6 serif-rule" />
            <p className="mt-4 text-sm tracking-[0.08em] uppercase text-[var(--serif-muted-foreground)]">
              Less noise, more substance
            </p>
          </div>
        </aside>
      </section>

      <section className="mt-24 md:mt-32">
        <SerifSectionLabel label="Latest Essays" />
        {featuredPosts.length === 0 ? (
          <div className="serif-card p-10 text-center text-lg text-[var(--serif-muted-foreground)]">
            暂时还没有文章，马上就来。
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <section id="about" className="mt-24 md:mt-32">
        <SerifSectionLabel label="About Me" className="max-w-3xl" />
        <div className="serif-card p-8 md:p-10">
          <p className="text-2xl leading-relaxed md:text-3xl">
            我希望这个博客像一本长期更新的个人文集，不追热点，优先写清楚真正重要的经验与判断。
          </p>
          <p className="mt-5 text-lg leading-relaxed text-[var(--serif-muted-foreground)]">
            如果你也喜欢有结构、能复读、可落地的内容，欢迎常来看看。
          </p>
        </div>
      </section>
    </Container>
  );
}
