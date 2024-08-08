import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import React from 'react';

const Navbar = ({ setCurrentView }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><a onClick={() => setCurrentView('main')}>Dashboard</a></li>
        <li><a onClick={() => setCurrentView('videos')}>Videos</a></li>
        <li><a onClick={() => setCurrentView('chatbot')}>Chatbot</a></li>
        <li><a onClick={() => setCurrentView('resources')}>Resources</a></li>
        <li><a onClick={() => setCurrentView('contact')}>Contact Support</a></li>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms of Service</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;