import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;

export default async function BlogListPage() {
  const allBlogsQuery = `*[_type == 'post']{
    title,
    slug,
    Summary,
    image{asset->{url}}
  }`;
  const allBlogs = await client.fetch(allBlogsQuery);
  const truncateText = (text: any, length: any) => {
    if (text?.length > length) {
      return `${text?.slice(0, length)}...`;
    }
    return text;
  };
  console.log(allBlogs.length,"dfdf")
  return (
    <section className="mt-20 h-[100vh] mb-24 px-2 2xl:px-12">
      <h1 className="text-3xl font-bold text-dark dark:text-light">
        All Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* {allBlogs.map((blog: any) => (
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
        ))} */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-[100%]">
        {allBlogs?.map((blog: any, groupIndex: any) => (
          <div key={groupIndex} className="flex gap-8 flex-col">
            {/* <Link href={`/blog/${post?.slug}`}> */}
            <div
              key={blog?.slug.current}
              className="flex gap-8 flex-col w-full"
            >
              <div className="flex flex-wrap sm:flex-nowrap gap-4">
                <Link
                  className="w-full sm:w-auto " 
                  href={`/blog/${blog?.slug.current}`}
                >
                  <div className="relative md:w-auto w-full">
                    <Image
                      src={urlFor(blog.image)}
                      alt={"blogimg"}
                      width={320}
                      height={200}
                      className="sm:w-[320px]   object-cover rounded-xl h-[200px] sm:h-[200px] w-full"
                    />
                    {/* <div className="absolute top-[16.85px] right-[19px] lg:top-[17px] lg:right-[20px] bottom-0 items-start flex gap-1">
                        {post?.tags?.map((tag: any, tagIndex: any) => (
                          <div key={tagIndex} className="blog-tag">
                            {tag?.name}
                          </div>
                        ))}
                      </div> */}
                  </div>
                </Link>
                <div className="flex flex-col gap-2 flex-1">
                  <Link href={`/blog/${blog?.slug.current}`}>
                    <div className="blog-side-trend-title">{blog?.title}</div>
                    <div className="blog-trend-desc">
                      {truncateText(blog?.Summary, 40)}
                    </div>
                    <div className="blog-trend-readpost mt-4 lg:mt-6">
                      Read post
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
