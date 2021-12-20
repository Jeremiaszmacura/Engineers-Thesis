import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, AdminContext } from '../../UserContext';

import styles from './MainNavigation.module.css';

const MainNavigation = () => {

    const { user, setUser } = useContext(UserContext);
    const { admin, setAdmin } = useContext(AdminContext);

    const logOut = () => {
        fetch(
            'http://localhost:4000/users/logout',
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] logout - fetch successful');
            } else {
                console.log('[CLIENT] logout - fetch NOT successful');
            }
            res.json().then(data => console.log('[SERVER] logout - '+data));
        });
        localStorage.clear();
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>MaKnowlegde</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {user ? ( 
                        <>
                        <li>
                            <Link to='/create-exam'>Create Test</Link>
                        </li>
                        <li>
                                <Link to='/my-exams'>My Tests</Link>
                            </li>
                        {!admin ? (
                            <li>
                                <Link to='/all-exams'>All Tests</Link>
                            </li>
                        ) : false }
                        <li>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <Link onClick={ () => {logOut(); setUser(null); setAdmin(null)} } to={'/'} >Logout</Link>
                        </li>
                        </>
                    ) : (
                        <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                        </>
                    )}
                    <li>
                        <Link to='/help'>Help</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;
