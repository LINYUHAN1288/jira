import React from 'react';
import { FullPageLoading } from 'components/lib';
import { useAuth } from 'context/auth-context';
import './App.css';

const AuthPage = React.lazy(() => import('auth/auth-page'));
const UnAuthPage = React.lazy(() => import('auth/unauth-page'));

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            <React.Suspense fallback={<FullPageLoading />}>{user ? <AuthPage /> : <UnAuthPage />}</React.Suspense>
        </div>
    );
}

export default App;
