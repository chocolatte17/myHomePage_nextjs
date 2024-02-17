import {Header} from './header';
import {Footer} from './footer';
import { font_opensans } from './_utils/font';

import './global.css';
import './colormanager.css';



export const metadata = {
  title: 'Chocolatte\'s site',
  description: 'chocolatteのウェブサイト',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={font_opensans.className}>
        <Header />
          {children}
	      <Footer />
      </body>
    </html>
  );
}
