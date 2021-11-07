import LoginForm from "../components/users/login/LoginForm";

const LoginPage = () => {



    const loginHandler = (loginData) => {
        fetch(
            'http://localhost:4000/users/login',
            {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            }
        )
        .then(res => {
            if (res.ok) {
                console.log('fetch successful');
            } else {
                console.log('fetch NOT successful');
            }
            res.json().then(data => console.log(data));
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <section>
            <h1>Login</h1>
            <LoginForm onLogin={loginHandler} />
        </section>
    );
}

export default LoginPage;