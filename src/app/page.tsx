import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
export const revalidate = 10;

export default async function Home() {
  
  const query = `*[_type=='post'] | order(_createdAt asc){
    title,
    summary,
    image{asset->{url}},
    "slug": slug.current
  }`;
  const posts: Post[] = await client.fetch(query);
  console.log(posts, "93939"); 
  return (
    <main className="flex mt-14  min-h-screen flex-col ">
      <h1 className="news-text ">
        Most Recent blogs
      </h1>
      <section className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post: Post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </section>
    </main>
  );
}
