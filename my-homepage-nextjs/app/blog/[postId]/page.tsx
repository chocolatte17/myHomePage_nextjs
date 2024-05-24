// static/[postId]/page.tsx

import { notFound } from "next/navigation";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { getDetail, getList } from "../../../libs/microcms";
import { BlogLayout, UniversalLayout } from "../../template";

export async function generateStaticParams() {
  const { contents } = await getList();
  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
}

export default async function StaticDetailPage({params: { postId },}: {params: { postId: string };}) {
  const post = await getDetail(postId);


  if (!post) {
    notFound();
  }


  const htmlParseOptions: HTMLReactParserOptions = {

  }


  return (
    <BlogLayout title={post.title} blogSummary={post} children={parse(post.content)}></BlogLayout>
    
  );
}