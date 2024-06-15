// static/[postId]/page.tsx

import { notFound } from "next/navigation";
import parse, { HTMLReactParserOptions, Element, Text, domToReact } from "html-react-parser";
import { getDetail, getList } from "../../../libs/microcms";
import { BlogLayout } from "../../template";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

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

  const isElement = (element: unknown): element is Element => element instanceof Element;
  const isText = (text: unknown): text is Text => text instanceof Text;

  if (!post) {
    notFound();
  }

  const htmlParseOptions: HTMLReactParserOptions = {
    replace(node) {
      if(!(node instanceof Element)) return;
      
      const { attribs } = node;

      // 画像
      if(node.name === "img") {
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

      // リンク
      if(node.name === "a" && attribs.href) {
        const children = node.children.filter(
          (_node): _node is Element | Text => isElement(_node) || isText(_node)
        );
        return <Link href={attribs.href} className={styles.link}>{domToReact(children, htmlParseOptions)}</Link>;
      }
    },
  };


  return (
    <BlogLayout title={post.title} blogSummary={post} children={parse(post.content, htmlParseOptions)}></BlogLayout>
    
  );
}