import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const SideNavBar = () => {
  return (
    <div className={styles.navigation_container}>
        <div className="navigation_links">
           <Link to='claims' className={styles.link}>Claims</Link>
           <Link to='notifications' className={styles.link}>Notifications</Link>
        </div>
    </div>
  )
}

export default SideNavBar