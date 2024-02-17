import Link from 'next/link'
import {font_opensans} from './_utils/font';
import styles from './header.module.css';

export function Header(){
	return (
		<div className={styles.header}>
			<div className={styles.navTop}>
				<Link className={styles.Link} href="/">[ChocolatteLogo]</Link>
			</div>
	  		<nav className={`${styles.navbar} ${font_opensans.className}`}>
			  		<div className={styles.navbutton}>
						<Link className={styles.Link} href="/">About</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link} href="/">Blog</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link} href="/">WebTools</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link} href="/">Contact</Link>
					</div>
				
			</nav>
		</div>
	);
}
