import Link from 'next/link'

import styles from './header.module.css';

export function Header(){
	return (
		<div className={styles.header}>
	  		<nav className={styles.navbar}>
				
					<div className={styles.navbutton}>
						<Link className={styles.Link}href="/">Blog</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link}href="/">WebTools</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link}href="/">Dashboard</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link}href="/">Dashboard</Link>
					</div>
					<div className={styles.navbutton}>
						<Link className={styles.Link}href="/">Dashboard</Link>
					</div>
				
			</nav>
		</div>
	);
}
