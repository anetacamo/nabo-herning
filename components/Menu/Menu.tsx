import Link from 'next/link';
import SkipNav from '../SkipNav/SkipNav';
import styles from './Menu.module.scss';
import { useState } from 'react';
import SearchField from '../SearchField/SearchField';
import Hamburger from '../Hamburger/Hamburger';

export default function Menu() {
  const menuItems = [
    { name: 'how to use', link: 'how-to-use' },
    { name: 'about', link: 'about' },
    { name: 'join the map', link: 'new-member' },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='menu'></div>
      <nav
        role='navigation'
        className={`bg-black menu ${styles.nav} ${open && styles.open} `}
      >
        <div className={styles.header}>
          <SkipNav />
          <Link href='/'>
            <a className={`${styles.logo} logo h2`}>Nåbø Map</a>
          </Link>

          <div className='flex desktop'>
            {menuItems.map((item, index) => (
              <Link href={`${item.link}`} key={index}>
                <a className={`${styles.li} li ${item.color}`}>{item.name}</a>
              </Link>
            ))}
          </div>
          <Hamburger open={open} onButtonClick={() => setOpen(!open)} />
        </div>
        <div className={`mobile ${styles.mobmenu}`}>
          {menuItems.map((item, index) => (
            <Link href={`${item.link}`} key={index}>
              <a className={`${styles.li} li ${item.color}`}>{item.name}</a>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
