import { getPosts } from '@/lib/posts';
import PostsWithSearch from '@/components/posts-with-search';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <h1 className="title mb-12 max-w-[400px]">
          I'm all about exploring, pushing limits and helping others build bolder
          <span className="ml-[1px] text-red-700">.</span>
        </h1>
        <p className="mb-12 max-w-[500px] text-[14px] font-extralight text-muted-foreground">
          A chronological collection of my in-depth thoughts on programming,
          leadership, product design, and everything in between.
        </p>

        <PostsWithSearch posts={posts} isAdmin={false} />
      </div>
    </section>
  );
}
