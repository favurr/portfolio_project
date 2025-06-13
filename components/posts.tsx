'use client';

import Link from 'next/link';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeletePostDialog } from './deletePostDialog';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Post } from '@/lib/posts';

type Props = {
  posts: Post[];
  isAdmin?: boolean;
};

export default function Posts({ posts, isAdmin = false }: Props) {
  const [items, setItems] = useState(posts);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete post');
    } else {
      toast.success('Post deleted successfully');
      setItems(prev => prev.filter(p => p.id !== id));
    }

    setLoadingId(null);
  };

  return (
    <ul className="flex flex-col gap-8">
      {items.map(post => (
        <li key={post.id}>
          <div className="flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row">
            <Link href={`/posts/${post.slug}`} className="max-w-lg">
              <p className="text-lg font-semibold">{post.title}</p>
              <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
                {post.summary}
              </p>
            </Link>

            <div className="flex flex-col items-end">
              <p className="mt-1 text-sm font-light">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              {isAdmin && (
                <div className="mt-2 flex gap-3">
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <SquarePen
                      size={20}
                      className="text-muted-foreground hover:text-foreground"
                    />
                  </Link>
                  <DeletePostDialog
                    onConfirm={() => handleDelete(post.id)}
                    isLoading={loadingId === post.id}
                  >
                    <Trash2
                      size={20}
                      className="text-red-600 hover:text-red-700"
                    />
                  </DeletePostDialog>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
