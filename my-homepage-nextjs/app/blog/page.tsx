import { client, getList } from "../../libs/microcms";
import blogstyles from './blog.module.css';
import Link from "next/link";
import Image from "next/image";
import styles from "../_common-components/Article.module.css";
import {SVGProps} from "react";



export function IcRoundEdit(props: SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
    )
}

export default async function StaticPage() {
 const { contents } = await getList();

 if (!contents || contents.length === 0) {
  return <h1>No contents</h1>;
 }

 return (
    <div className={styles.article}>
        <div className={styles.universal_layout}>
        <h1>Blog</h1>
        <div>
        <ul className={blogstyles.bloglist}>
            {contents.map((post) => {   

                const revisedAt = post.revisedAt?.split('T')[0];
                const publishedAt = post.publishedAt?.split('T')[0];

                return (
                    <li key={post.id} className={blogstyles.li}>
                        <Link href={`/blog/${post.id}`} className={blogstyles.Link}>
                            <div className={blogstyles.articleCard}>
                                <div className={blogstyles.articleImage}>
                                    <Image
                                        src={post.eyecatch?.url ? post.eyecatch.url : "https://images.microcms-assets.io/assets/0fb09432235148a6a6e314a715192c94/0468ade415744b5897980fe9cbf2deff/test_noimage-760x460.png"} 
                                        alt="アイキャッチ画像"
                                        width={400}
                                        height={200}
                                    />
                                </div>
                                <div className={blogstyles.articleDescription}>
                                    <h3>{post.title}</h3>
                                    <div>
                                        <a><IcRoundEdit/> {post.author}</a>
                                        <a>公開日時: {publishedAt}　更新日時: {revisedAt}</a>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
        </div>
        </div>
    </div>
 );
}
