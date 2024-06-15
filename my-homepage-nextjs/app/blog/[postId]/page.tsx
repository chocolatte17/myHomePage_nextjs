// static/[postId]/page.tsx

import { notFound } from "next/navigation";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { getDetail, getList } from "../../../libs/microcms";
import { BlogLayout, UniversalLayout } from "../../template";
import Image from "next/image";

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
    replace(node) {
      if(!(node instanceof Element)) return;
      if(node.name === "img"){
        const { attribs } = node;
        let width: number = Number(attribs.width);
        let height: number = Number(attribs.height);

        return (
          <>
            <div style={{display: "block"}}>
              <Image 
                src={attribs.src}
                width={width}
                height={height}
                layout="responsive"
                /*max-width <- CSSの@media閾値, 82vwが親要素の横幅*/
                sizes="(max-width: 900px) 90%,
                        (max-width: 1160px) 80%,
                        70%"
                alt={attribs.alt ? attribs.alt : "画像"}
              />  
            </div>
            
          </>
        );
      }
    },
  };


  return (
    <BlogLayout title={post.title} blogSummary={post} children={parse(post.content, htmlParseOptions)}></BlogLayout>
    
  );
}