import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { formatDotDate, truncateStr } from "../page";

export const revalidate = 10;

export default async function ArticleListPage() {
  const allBlogsQuery = `*[_type == 'article']{
    title,
    slug,
    Summary,
    image{asset->{url}},
    _createdAt  
  }`;
  const allArticle = await client.fetch(allBlogsQuery);
  const truncateText = (text: any, length: any) => {
    if (text?.length > length) {
      return `${text?.slice(0, length)}...`;
    }
    return text;
  };
  console.log(allArticle,"dfdf")
  return (
    <section className="mt-8 h-screen">
    <div className="flex  justify-between ">
      <div className="flex flex-col">
        <h1 className={"news-text"}>New</h1>
      </div>

      {/* <div className="flex items-center md:mt-6">
        <Link
          href={"/article"}
          className={"see-all-green text-primary-semibold"}
        >
          See all
        </Link>
      </div> */}
    </div>

    {allArticle.map((post: any, index: any) => {
      const isLastItem = index === allArticle.length - 1;

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
            href={`/article/${post.slug.current}`}
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
    })}
  </section>
  );
}
