import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;

export default async function BlogListPage() {
  const allBlogsQuery = `*[_type == 'post']{
    title,
    slug,
    summary,
    image{asset->{url}}
  }`;
  const allBlogs = await client.fetch(allBlogsQuery);

  return (
    <section className="mt-12 mb-24 px-2 2xl:px-12">
      <h1 className="text-3xl font-bold text-dark dark:text-light">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {allBlogs.map((blog: any) => (
          <div key={blog.slug.current} className="p-4 border rounded shadow">
            <Image
              src={urlFor(blog.image)}
              width={500}
              height={300}
              alt={blog.title}
              className="rounded"
            />
            <h2 className="text-xl font-bold mt-4">{blog.title}</h2>
            <p className="text-sm mt-2">{blog.summary}</p>
            <Link
              href={`/blog/${blog.slug.current}`}
              className="text-accentDarkPrimary mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
