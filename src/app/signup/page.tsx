"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Signup: any = dynamic(() => import("./signup").then(mod => mod.default) as any, { ssr: false });

export default function BigFeatureList() {
  const router = useRouter();
  return (
    <>
      <title>{`Sign Up`}</title>
      <Signup router={router} />

    </>
  );
}
