import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import CreateExamPage from './pages/CreateExam';
import DashboardPase from './pages/Dashboard';
import HelpPage from './pages/Help';
import AllExamsPage from './pages/AllExams';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Layout from './components/layout/Layout';

const App = () => {
    return (
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
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/register'>
                    <RegisterPage />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
