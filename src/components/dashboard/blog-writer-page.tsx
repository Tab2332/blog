import { Markdown } from '@/components/markdown/markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IconCopy, IconRefresh } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type BlogDraft = {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  image: string;
  content: string;
};

const defaultDate = new Date().toISOString().slice(0, 10);

const DEFAULT_DRAFT: BlogDraft = {
  title: '',
  slug: '',
  description: '',
  category: 'General',
  date: defaultDate,
  image: '',
  content: '',
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function toYamlString(value: string): string {
  return JSON.stringify(value.trim());
}

function toMarkdownDraft(draft: BlogDraft): string {
  const lines = [
    '---',
    `title: ${toYamlString(draft.title || 'Untitled')}`,
    `description: ${toYamlString(draft.description || 'Post summary')}`,
    `date: ${draft.date || defaultDate}`,
    `category: ${toYamlString(draft.category || 'General')}`,
    ...(draft.image.trim()
      ? [`image: ${toYamlString(draft.image.trim())}`]
      : []),
    '---',
    '',
    draft.content.trim() || '在这里开始写正文...',
    '',
  ];

  return lines.join('\n');
}

export function BlogWriterPage() {
  const [draft, setDraft] = useState<BlogDraft>(DEFAULT_DRAFT);
  const [autoSlug, setAutoSlug] = useState(true);
  const markdownOutput = useMemo(() => toMarkdownDraft(draft), [draft]);
  const fileName = `${draft.slug || 'new-post'}.md`;

  const setField = <K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (value: string) => {
    setDraft((prev) => ({
      ...prev,
      title: value,
      slug: autoSlug ? slugify(value) : prev.slug,
    }));
  };

  const handleSlugChange = (value: string) => {
    setAutoSlug(false);
    setField('slug', slugify(value));
  };

  const regenerateSlug = () => {
    setAutoSlug(true);
    setField('slug', slugify(draft.title));
  };

  const resetDraft = () => {
    setDraft(DEFAULT_DRAFT);
    setAutoSlug(true);
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownOutput);
      toast.success('Markdown 已复制到剪贴板');
    } catch {
      toast.error('复制失败，请手动复制');
    }
  };

  const previewContent =
    draft.content.trim() ||
    `### 从这里开始写作\n\n- 在左侧填写标题和摘要\n- 在正文写 Markdown 内容\n- 复制后粘贴到 \`content/blog/${fileName}\``;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 lg:gap-6 lg:py-6">
          <div className="grid gap-4 px-4 lg:px-6 2xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="serif-card serif-card-accent h-full overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">博客写作</CardTitle>
                <CardDescription>
                  填写元信息与正文，自动生成可直接落盘的 Markdown 文件内容。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="post-title">标题</Label>
                  <Input
                    id="post-title"
                    className="serif-input h-11"
                    value={draft.title}
                    placeholder="例如：如何搭建个人博客"
                    onChange={(event) => handleTitleChange(event.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <div className="space-y-2">
                    <Label htmlFor="post-slug">Slug（文件名）</Label>
                    <Input
                      id="post-slug"
                      className="serif-input h-11"
                      value={draft.slug}
                      placeholder="how-to-build-a-blog"
                      onChange={(event) => handleSlugChange(event.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-auto h-11"
                    onClick={regenerateSlug}
                  >
                    <IconRefresh className="size-4" />
                    重新生成
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-description">摘要</Label>
                  <Textarea
                    id="post-description"
                    className="serif-input min-h-20"
                    value={draft.description}
                    placeholder="用 1-2 句话说明这篇文章内容"
                    onChange={(event) =>
                      setField('description', event.target.value)
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="post-category">分类</Label>
                    <Input
                      id="post-category"
                      className="serif-input h-11"
                      value={draft.category}
                      placeholder="General"
                      onChange={(event) =>
                        setField('category', event.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-date">日期</Label>
                    <Input
                      id="post-date"
                      type="date"
                      className="serif-input h-11"
                      value={draft.date}
                      onChange={(event) => setField('date', event.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-image">封面图 URL（可选）</Label>
                  <Input
                    id="post-image"
                    className="serif-input h-11"
                    value={draft.image}
                    placeholder="https://example.com/cover.jpg"
                    onChange={(event) => setField('image', event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-content">正文（Markdown）</Label>
                  <Textarea
                    id="post-content"
                    className="serif-input min-h-[360px] font-mono text-sm leading-6"
                    value={draft.content}
                    placeholder="# 标题\n\n开始写你的正文..."
                    onChange={(event) =>
                      setField('content', event.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/40">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">目标文件: {fileName}</Badge>
                  <Badge variant="outline">content/blog/{fileName}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={resetDraft}>
                    重置
                  </Button>
                  <Button type="button" onClick={copyMarkdown}>
                    <IconCopy className="size-4" />
                    复制 Markdown
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="serif-card serif-card-accent overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">实时预览</CardTitle>
                  <CardDescription>
                    右侧预览最终展示效果，确认后再复制保存。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      {draft.category || 'General'}
                    </Badge>
                    <span className="serif-meta">
                      {draft.date || defaultDate}
                    </span>
                  </div>
                  <h2 className="text-3xl leading-tight md:text-4xl">
                    {draft.title || '文章标题预览'}
                  </h2>
                  {draft.description ? (
                    <p className="text-lg text-[var(--serif-muted-foreground)]">
                      {draft.description}
                    </p>
                  ) : null}
                  {draft.image ? (
                    <img
                      src={draft.image}
                      alt="cover preview"
                      className="w-full rounded-xl border border-[var(--serif-border)] object-cover"
                    />
                  ) : null}
                  <div className="serif-rule" />
                  <Markdown
                    content={previewContent}
                    className="serif-prose prose prose-neutral max-w-none"
                  />
                </CardContent>
              </Card>

              <Card className="serif-card overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">生成结果</CardTitle>
                  <CardDescription>
                    这是最终写入到 Markdown 文件的内容。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    className="min-h-[230px] font-mono text-xs leading-6"
                    value={markdownOutput}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
