import RegisterForm from "../components/users/register/RegisterForm";

const RegisterPage = () => {

    const registerHandler = (registerData) => {
        fetch(
            'http://localhost:4000/users/register',
            {
                method: 'POST',
                body: JSON.stringify(registerData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] register - fetch successful');
            } else {
                console.log('[CLIENT] register - fetch NOT successful');
            }
            res.json().then(data => console.log('[SERVER] register - ' + data));
        });
    };

    return (
        <section>
            <h1>Register</h1>
            <RegisterForm onRegister={registerHandler} />
        </section>
    );
}

export default RegisterPage;