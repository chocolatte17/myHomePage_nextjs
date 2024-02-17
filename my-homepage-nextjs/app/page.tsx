import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'TOP',
}

export default function Page(){
	return (
		<>
			<h2>Hello, NextJS!</h2>
			<p>hello, NextJS! こんにちは。このウェブサイトはchocolatteの管理するウェブサイトで、2024年2月に世に解き放たれました。そして、このトップページはブログや今後作成するであろうウェブツール等へつながるハブとしてのページとなります。</p>
		</>
	);
}
