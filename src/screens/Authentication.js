import { Link, useNavigate } from 'react-router-dom';
import '../screens/Authentication.css';
import React from 'react';
import { useUser } from '../context/useUser';

export const AuthenticationMode = Object.freeze({
    Login: 'signin',
    Register: 'signup'
});

export default function Authentication({ authenticationMode }) {
    const { user, setUser, signUp, signIn } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await signUp();
                navigate('/signin');
            } else {
                await signIn();
                navigate('/');
            }
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data.error : error;
            alert(message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{authenticationMode === AuthenticationMode.Login ? 'Sign In' : 'Create an Account'}</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        {authenticationMode === AuthenticationMode.Login ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-footer">
                    <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                        {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already have an account? Sign in'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
