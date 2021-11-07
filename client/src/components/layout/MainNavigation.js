import { Link } from 'react-router-dom';

import styles from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>MaKnowlegde</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home Page</Link>
                    </li>
                    <li>
                        <Link to='/create-exam'>Creat Exam</Link>
                    </li>
                    <li>
                        <Link to='/all-exams'>All Exams</Link>
                    </li>
                    <li>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/help'>Help</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;
