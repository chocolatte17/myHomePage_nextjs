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
export function BlogLayout({title, children}: {title: string, children: React.ReactNode}){
	return (
		<>
			<div className={styles.article}>
				<div className={styles.blog_layout}>
					<h1>{title}</h1>
					<div>{children}</div>
				</div>
			</div>
		</>
	);
}
