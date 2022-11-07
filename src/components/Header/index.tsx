import Link from "next/link";

import styles from "./styles.module.scss";

export function Header(){
    return(
        <header className={styles.container}>
            <div className={styles.top}>
                <h1>Lindas atelier</h1>
            </div>
            <nav className={styles.navigate}>
                <Link href="/">
                    Pagina inicial
                </Link>
                <Link href="/posts">
                    Postagens
                </Link>
                <Link href="/sobre">
                    Quem somos?
                </Link>
            </nav>
        </header>
    )
}