import {Header} from './header';
import {Footer} from './footer';
import Template from './template';

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
        <Template>{children}</Template>
	<Footer />
      </body>
    </html>
  )
}
