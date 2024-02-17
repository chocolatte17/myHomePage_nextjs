import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Chocolatte\'s site/Home',
}

export default function Page(){
	return (
		<div className={styles.article}>
			<h2>Hello, NextJS!</h2>
			<p>hello, NextJS! こんにちは。このウェブサイトはchocolatteの管理するウェブサイトで、2024年2月に世に解き放たれました。そして、このトップページはブログや今後作成するであろうウェブツール等へつながるハブとしてのページとなります。</p>
		</div>
	);
}
