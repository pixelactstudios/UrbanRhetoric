import { DashboardShell } from '@/components/shell/shell';
import { DashboardHeader } from '@/components/header/header';
import { PostCreateButton } from '@/components/post-create-button/post-create-button';
import { PostItem } from '@/components/post-item/post-item';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
