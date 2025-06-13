'use client';

import { useEffect, useState } from 'react';
import type { Post } from '@/lib/posts';
import PostsWithSearch from '@/components/posts-with-search';
import { toast } from 'sonner';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/mdx-posts');
        const json = await res.json();
        if (res.ok) {
          setPosts(json.data);
        } else {
          toast.error(json.error || 'Failed to load posts');
        }
      } catch {
        toast.error('Could not fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading posts...</p>
        ) : (
          <PostsWithSearch posts={posts} isAdmin />
        )}
      </div>
    </section>
  );
}
