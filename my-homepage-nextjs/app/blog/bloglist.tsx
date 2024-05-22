"use client";

//page.tsxから呼び出されるブログ一覧の表示部
//呼び出し時にサーバー側で取得したデータを引数として内容を受け取る
//use clientなので、クライアント側で描画される設定

import { useState } from "react";
import { Blog, Tag } from "../../libs/microcms_types";
import blogstyles from './blog.module.css';
import Link from "next/link";
import Image from "next/image";
import {SVGProps} from "react";


export default function BlogList({contents, tags}: {contents:Blog[], tags: Tag[]}){

    // 選択されているタグ
    const ALLARTICLE: string = "全ての記事" 
    const [selectedTags, setSelectedTags] = useState<String[]>(tags.map(tag => tag.name));

    function selectedTagsHandler ({tagname}: {tagname:string}) {
        if(selectedTags.includes(tagname)){
            setSelectedTags(selectedTags.filter((tag, index) => (tag !== tagname)))
        }else{
            setSelectedTags([...selectedTags, tagname]);
        }
        console.log(...selectedTags);
    }

    // ここがBlogListの本体
    // return <Articl..nent key={index}>は良くないらしい。こっちは本当にダメそうだから後でなんとかしておく
    return (
        <>
        {tags.map((tag) => {
            return (
                <>
                    <TagButtonComponent tagname={tag.name} />
                </>
            );
        })}

        <ul className={blogstyles.bloglist}>
                {contents.map((post, index) => {   
                    return <ArticleCardComponent key={index} post={post} selectedTags={selectedTags}/>                
                })}
        </ul>
        </>
    );

    //タグの選択に使うボタン
    function TagButtonComponent({tagname}: {tagname: string}){

        const toggleState = () => {
            selectedTagsHandler({tagname: tagname});
        }

        return (
            <button onClick={toggleState} className={`${selectedTags.includes(tagname) ? blogstyles.button_active : blogstyles.button_nonactive} ${blogstyles.select_button}`}>{tagname}</button>
        );
    };
}



//ペンのアイコン
function IcRoundEdit(props: SVGProps<SVGSVGElement>) {
    // Google Material Icons, Apache2.0
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
    )
}

//カテゴリのアイコン
function MaterialSymbolsCategory(props: SVGProps<SVGSVGElement>) {
    // Material Symbols, Apache2.0
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5q0-1.875 1.313-3.187T17.5 13q1.875 0 3.188 1.313T22 17.5q0 1.875-1.312 3.188T17.5 22M3 21.5v-8h8v8z"></path></svg>
    )
}


//記事カード内タグ表示のコンポーネント
// <a key={index}はホントはよろしくないらしいので後でなんとかしておく　<- でも、タグが動的に変わることはないからいいんじゃないのとも思う
function TagComponent({tags = []}: {tags?:Array<Tag>}){
    if(tags.length == 0){
        return <></>;
    }else{
        return (
            <>
                <MaterialSymbolsCategory />
                {tags.map((tag, index) => {
                    return (
                        <a key={index}>
                            {tag.name}
                            {(() => {
                              if (index != tags.length-1) {
                                return "/"
                              }
                            })()}
                        </a>
                    );
                })}
            </>
        );
    }   
}

//記事カードのコンポーネント
function ArticleCardComponent({post, selectedTags}: {post:Blog, selectedTags:String[]}){
    const revisedAt = post.revisedAt?.split('T')[0];
    const publishedAt = post.publishedAt?.split('T')[0];


    // TODO: Linkタグの中にdivが入っており、不正なHTMLによると思われるHydrationエラーが発生しているが、機能はするので一応放置。「いつか」直そう
    if(post.tags.some((val) => selectedTags.includes(val.name)) || post.tags.length == 0){
        return (
            <li key={post.id} className={blogstyles.li}>
                <Link href={`/blog/${post.id}`} className={blogstyles.Link}>
                    <div className={blogstyles.articleCard}>
                        <div className={blogstyles.articleImage}>
                            <Image
                                src={post.eyecatch?.url ? post.eyecatch.url : "https://images.microcms-assets.io/assets/0fb09432235148a6a6e314a715192c94/1cfbd0142df24cf7b39875f0e157c18e/NoImage_shoshinsha-design.com.png"} //アイキャッチ画像がなければNOImageの画像が代わりに出る。
                                alt="アイキャッチ画像"
                                width={320}
                                height={168}
                            />
                        </div>
                        <div className={blogstyles.articleDescription}>
                            <h3>{post.title}</h3>
                            <div>
                                <a><IcRoundEdit/> {post.author}　<TagComponent tags={post.tags}/></a>
                                <a>公開日: {publishedAt}　更新日: {revisedAt}</a>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }else{
        return (<></>);
    }
    
}