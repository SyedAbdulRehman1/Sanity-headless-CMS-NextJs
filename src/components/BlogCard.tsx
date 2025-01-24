import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <section className="flex flex-col justify-between   rounded bg-light/90 shadow-lg group hover:scale-105 transition-transform ease-out duration-700">
      <div className="relative flex justify-center max-h-[150px] ">
        {post?.image && (
          <Image
            src={urlFor(post.image)}
            alt="AI for everyone"
            width={250}
            height={250}
            className="object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex flex-col justify-between gapx-y-4  p-4">
        <h2 className="text-lg font-semibold line-clamp-2 text-dark dark:text-light leading-tight mb-2">
          {post.title}
        </h2>
        <p className="text-dark/70 dark:text-light/70 line-clamp-3">
          {post.summary}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="block px-4 py-1 text-center bg-primary-semibold  rounded text-white font-medium mt-4"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}
