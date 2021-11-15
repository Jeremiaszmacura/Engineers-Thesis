import { useContext, useState, useRef } from 'react';

import { Link } from 'react-router-dom';
import Card from '../components/ui/Card'
import styles from './Dashboard.module.css'
import { UserContext, AdminContext } from '../UserContext';

const DashboardPage = () => {

    const { user } = useContext(UserContext);
    const { admin } = useContext(AdminContext);

    const [changePassword, setChangePassword] = useState(false);
    const oldPasswordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const repeatNewPasswordInputRef = useRef();

    const submitHandler = () => {
        console.log("change password API")
    }

    return (
        
        <div className={styles.page}>
                {user ? (
                    <>
                    <h1>Account Details</h1>
                    <Card>
                        <div className={styles.field}>
                            <p className={styles.title}>Username: </p>
                            <p>{user.name}</p>
                            <p className={styles.title}>Email: </p>
                            <p>{user.email}</p>
                            <p className={styles.title}>Role: </p>
                            {admin ? (<p>admin</p>):(<p>user</p>)}
                        </div>
                    </Card>
                    <div className={styles.buttons}>
                        <Link to='/all-exams'><button>All Exams</button></Link>
                        <button onClick={setChangePassword}>Change Password</button>
                    </div>
                    {changePassword ? (
                    <>
                    <Card>
                        <form className={styles.form} onSubmit={submitHandler}>
                            <div className={styles.control}>
                                <label htmlFor='oldPassword'>Old Password</label>
                                <input type='password' required id='oldPassword' ref={oldPasswordInputRef} />
                            </div>
                            <div className={styles.control}>
                                <label htmlFor='newPassword'>New Password</label>
                                <input type='password' required id='newPassword' ref={newPasswordInputRef} />
                            </div>
                            <div className={styles.control}>
                                <label htmlFor='repeatNewPassword'>Repeat New Password</label>
                                <input type='password' required id='repeatNewPassword' ref={repeatNewPasswordInputRef} />
                            </div>
                            <div className={styles.actions}>
                                <button id={styles.submit}>Submit</button>
                            </div>
                        </form>
                    </Card>
                </>
            ) : (null)}
                </>
            ) : (
                <div className={styles.errorCard}>
                    <Card>
                        <div className={styles.errorMessage}>
                            <p>You have to be logged in first</p>
                        </div>
                    </Card>
                </div>
            )}
            
        </div>
    );
}

export default DashboardPage;