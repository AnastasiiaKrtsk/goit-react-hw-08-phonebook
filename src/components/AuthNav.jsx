import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';
export default function AuthNav() {
  return (
    <div className={styles.nav}>
      <NavLink className={styles.text} to="/register">
        Registration
      </NavLink>
      <NavLink className={styles.text} to="/login">
        Login
      </NavLink>
    </div>
  );
}
