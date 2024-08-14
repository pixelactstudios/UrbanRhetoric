// Global Imports
import { type Metadata } from 'next';

// Internal Imports
import { siteConfig } from '@/config/site';
import { DashboardShell } from '@/components/shell/shell';
import { DashboardHeader } from '@/components/header/header';
import { PostCreateButton } from '@/components/post-create-button/post-create-button';
import { PostItem } from '@/components/post-item/post-item';
import { api, HydrateClient } from '@/trpc/server';
import { EmptyPlaceholder } from '@/components/empty-placeholder/empty-placeholder';

// Types
export const metadata: Metadata = {
  title: 'Dashboard',
  description: `${siteConfig.name} Dashboard`,
};

// Component
const DashboardPage = async () => {
  const posts = await api.post.getAllPosts();
  void api.post.getAllPosts.prefetch();

  return (
    <HydrateClient>
      <DashboardShell>
        <DashboardHeader heading="Posts" text="Create and manage posts.">
          <PostCreateButton />
        </DashboardHeader>
        <div>
          {posts?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {posts.map((post) => (
                <PostItem post={post} key={post.id} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </DashboardShell>
    </HydrateClient>
  );
};

// Exports
export default DashboardPage;
