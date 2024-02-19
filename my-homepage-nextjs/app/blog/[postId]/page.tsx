// static/[postId]/page.tsx

import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getDetail, getList } from "../../../libs/microcms";

export async function generateStaticParams() {
 console.log("generateStaticParams: 記事一覧取得中...");
 const { contents } = await getList();
 console.log("取得完了(記事Id): ");

 const paths = contents.map((post) => {
 console.log(post.id); 
 return {
   postId: post.id,
  };
 });

 return [...paths];
}

export default async function StaticDetailPage({
 params: { postId },
}: {
 params: { postId: string };
}) {
 console.log("StaticDetailPage: 記事ページ生成中...");
 const post = await getDetail(postId);
 console.log("生成完了: "+post.title);

 // ページの生成された時間を取得
 const time = new Date().toLocaleString();

 if (!post) {
  notFound();
 }

 return (
  <div>
   <h1>{post.title}</h1>
   <h2>{time}</h2>
   <div>{parse(post.content)}</div>
  </div>
 );
}