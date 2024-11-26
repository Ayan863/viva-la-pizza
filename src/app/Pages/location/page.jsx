import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../Components/Map/Map'));

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Map />
    </main>
  )
}
