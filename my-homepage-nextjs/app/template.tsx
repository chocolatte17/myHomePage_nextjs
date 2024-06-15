import {SVGProps} from "react";
import { Blog } from '../libs/microcms_types';
import styles from './_common-components/Article.module.css';

// テンプレートの例
export default function Template({children}: {children: React.ReactNode}) {
	 return <div>{children}</div>
}

//About、Contactページの共通レイアウト。
export function UniversalLayout({title, children}: {title: string, children: React.ReactNode}){
	return (
		<>
			<div className={styles.article}>
				<div className={styles.universal_layout}>
					<h1>{title}</h1>
					<div>{children}</div>
				</div>
			</div>
		</>
	);
}


//ブログ各記事のレイアウト
// 引数が多いからBlog型でもらってきたいけど、blog型はmicroCMSの型に依存していてなんだかなー <- 両対応！で頑張る
export function BlogLayout({title, auther, lastUpdated, blogSummary, children}: {title: String, auther?: String, lastUpdated?: String, blogSummary?: Blog, children: React.ReactNode}){
	return (
		<>
			<div className={styles.article}>
				<div className={styles.blog_layout}>
					<h1>{title}</h1>
					<SupplementaryInfoWidget />
					<div className={styles.body}>{children}</div>
				</div>
			</div>
		</>
	);

	//著者とかそういうのを表示するやつ
	function SupplementaryInfoWidget(){
		return(
			<>
				<div className={styles.SupplementaryInfoWidget}>
					<IcRoundEdit/>
					<a className={styles.item}>{auther ? auther : blogSummary ? blogSummary.author: "匿名"}</a>
					<IcOutlineAccessTime/>
					<a className={styles.item}>{lastUpdated ? lastUpdated : blogSummary ? blogSummary.updatedAt.split('T')[0]: " - "}</a>
				</div>
			</>
		);
	}

	
	//時計アイコン
	function IcOutlineAccessTime(props: SVGProps<SVGSVGElement>) {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "2px", marginLeft: "10px"}} width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"></path></svg>
		)
  	}

	//ペンアイコン
	function IcRoundEdit(props: SVGProps<SVGSVGElement>) {
		// Google Material Icons, Apache2.0
		return (
		<svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "2px", marginLeft: "10px"}} width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
		)
	}

	
}

