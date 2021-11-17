import { useState, useMemo, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import CreateExamPage from './pages/CreateExam';
import DashboardPase from './pages/Dashboard';
import HelpPage from './pages/Help';
import AllExamsPage from './pages/AllExams';
import MyExamsPage from './pages/MyExams'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Layout from './components/layout/Layout';
import { UserContext, AdminContext } from './UserContext';

const App = () => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);
    const value2 = useMemo(() => ({ admin, setAdmin }), [admin, setAdmin]);

    useEffect(() => {
        const userFromStorage = localStorage.getItem("userInStorage");
        const roleFromStorage = localStorage.getItem("roleInStorage");
        if (userFromStorage) {
            const userFromStorageParsed = JSON.parse(userFromStorage)
            setUser(userFromStorageParsed);
        }
        if (roleFromStorage) {
            const roleFromStorageParsed = JSON.parse(roleFromStorage)
            setAdmin(roleFromStorageParsed);
        }
      }, []);

    return (
        <UserContext.Provider value={value}>
            <AdminContext.Provider value={value2}>
                <Layout>
                    <Switch>
                        <Route path='/' exact>
                            <HomePage />
                        </Route>
                        <Route path='/create-exam'>
                            <CreateExamPage />
                        </Route>
                        <Route path='/dashboard'>
                            <DashboardPase />
                        </Route>
                        <Route path='/help'>
                            <HelpPage />
                        </Route>
                        <Route path='/all-exams'>
                            <AllExamsPage />
                        </Route>
                        <Route path='/my-exams'>
                            <MyExamsPage />
                        </Route>
                        <Route path='/login'>
                            <LoginPage />
                        </Route>
                        <Route path='/register'>
                            <RegisterPage />
                        </Route>
                    </Switch>
                </Layout>
            </AdminContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
