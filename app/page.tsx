export const instant = false;

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('获取文章失败');
  }

  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">WordPress 独立站测试 -yi一句已经学会</h1>

      {posts.length === 0 ? (
        <p>暂无文章，请先在 WordPress 后台发布几篇测试文章。</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post: any) => (
            <li key={post.id} className="border-b pb-4">
              <h2 className="text-xl font-semibold">{post.title.rendered}</h2>
              <div
                className="mt-2 text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <p className="text-sm text-gray-400 mt-1">
                发布于：{new Date(post.date).toLocaleDateString('zh-CN')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}