import {Header} from './header';
import {Footer} from './footer';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
	<Footer />
      </body>
    </html>
  )
}
