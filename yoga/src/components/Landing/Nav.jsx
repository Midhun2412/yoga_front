import React from 'react';

function Nav() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logott}>MAT YOGI</div>
      <div style={styles.navItems}>
        <a href="#home" style={styles.navLink}>Home</a>
        <a href="#about" style={styles.navLink}>About</a>
        <a href="#features" style={styles.navLink}>Features</a>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  navItems: {
    display: 'flex',
  },
  navLink: {
    color: '#fff',
    marginLeft: '5rem',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default Nav;
