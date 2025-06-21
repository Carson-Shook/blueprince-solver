import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <a href="/numeric-cores" >Numeric Cores Solver</a>
      </main>
      <footer className={styles.footer}>
        <div />
      </footer>
    </div>
  );
}
