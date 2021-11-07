import { useRef } from 'react';

import styles from './LoginForm.module.css';
import Card from '../../ui/Card';

const LoginForm = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const loginData = {
            email: enteredEmail,
            password: enteredPassword,
        };

        props.onLogin(loginData);
    }

    return (
        <Card>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' required id='email' ref={emailInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' required id='password' ref={passwordInputRef} />
                </div>
                <div className={styles.actions}>
                    <button>Login</button>
                </div>
            </form>
        </Card>
    );
}

export default LoginForm;
