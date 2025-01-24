import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { formatDotDate, truncateStr } from "./lib/common";
export const revalidate = 10;

export default async function Home() {
  const query = `*[_type=='post'] | order(_createdAt asc){
    title,
    Summary,
    image{asset->{url}},
    "slug": slug.current
  }`;
  const posts: Post[] = await client.fetch(query);
  const queryArticle = `*[_type=='article'] | order(_createdAt asc){
    title,
    Summary,
    image{asset->{url}},
    "slug": slug.current,
    _createdAt  
  }`;
  const articles: Post[] = await client.fetch(queryArticle);
  console.log(articles, "dfdf434");
  return (
    <main className="flex mt-6  min-h-screen flex-col ">
      <h1 className="news-text ">Most Recent blogs</h1>
      <section className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {posts.length > 0 ? ( posts.map((post: Post) => (
          <BlogCard post={post} key={post.slug} />
        ))):(
          <div>No Record Found</div>
        )}
      </section>
      <section className="mt-8">
        <div className="flex  justify-between ">
          <div className="flex flex-col">
            <h1 className={"news-text"}>New</h1>
          </div>

          <div className="flex items-center md:mt-6">
            <Link
              href={"/article"}
              className={"see-all-green text-primary-semibold"}
            >
              See all
            </Link>
          </div>
        </div>
        {articles.length > 0 ? (
          articles.map((post: any, index: any) => {
            const isLastItem = index === posts.length - 1;

            const borderClass = `${
              isLastItem ? "border-y pb-[41px]" : "border-t"
            } border-[#E4E7EC]`;

            return (
              <div
                key={index}
                className={`flex pb-6 pt-6 lg:py-[25px]  justify-between items-center  ${borderClass}`}
              >
                <a
                  className={`flex w-full justify-between md:flex-row flex-col`}
                  href={`/article/${post.slug}`}
                >
                  <div
                    className={`flex md:pr-[84px] flex-col md:flex-row 
                "gap-4"
              md:gap-14 lg:gap-[126px]`}
                  >
                    <div className="flex flex-col shrink-0 gap-2">
                      <div className={`news-details-text cursor-pointer`}>
                        {formatDotDate(post._createdAt)}
                      </div>
                    </div>
                    <div>
                      <p className={"news-title"}>{post.title}</p>
                      <div
                        className={`flex
                  
                 pt-4 md:pt-2`}
                      >
                        <div className="news-desc hidden md:block cursor-pointer">
                          {post.Summary && truncateStr(post.Summary, 85)}
                        </div>
                        <div
                          className={`news-desc"
                      block md:hidden cursor-pointer`}
                        >
                          {/* {a.description && truncateString(a.description, 70)} */}
                        </div>
                      </div>
                      <div className="news-Vdetails-text block pt-4  md:hidden cursor-pointer">
                        View details
                      </div>
                    </div>
                  </div>

                  <Image
                    src={urlFor(post.image)}
                    alt={"a.cover.alternativeText"}
                    width={262}
                    height={161}
                    className="hidden object-fill rounded-2xl md:block w-[262px] h-[161px]"
                  />
                </a>
              </div>
            );
          })
        ) : (
          <div className="mt-4">No Record Found</div>
        )}
      </section>
    </main>
  );
}
