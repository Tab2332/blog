import { BlogWriterPage } from '@/components/dashboard/blog-writer-page';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { messages } from '@/messages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/write')({
  ssr: false,
  component: DashboardWritePage,
});

function DashboardWritePage() {
  const breadcrumbs = [
    {
      label: messages.dashboard.title,
      isCurrentPage: false,
    },
    {
      label: 'Write Blog',
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <BlogWriterPage />
    </>
  );
}
