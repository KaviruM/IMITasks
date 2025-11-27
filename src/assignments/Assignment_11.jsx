import React, { useState } from 'react';
import axios from 'axios';
import './Assignment_11.css';

function Assignment_11() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const response = await axios.post('https://auth.dnjs.lk/api/login', {
                email: email,
                password: password
            });

            const token = response.data.access_token;

            const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Full user data:', userResponse.data);

            setUserData(userResponse.data);
            setSuccess(true);
            setLoading(false);

        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    const getBio = (data) => {
        return data.profile_description || data.bio || data.description || data.about || 'No bio available';
    };


    const getProfileImage = (data) => {
        return data.profile_pic || data.avatar || data.image || data.photo_url || 'https://via.placeholder.com/150';
    };

    if (userData) {
        return (
            <div className="assignment-11">
                <h2>Assignment 11: User Profile</h2>
                <div className="user-profile">
                    <div className="profile-header">
                        <img
                            src={getProfileImage(userData)}
                            alt="Profile"
                            className="profile-pic"
                        />
                        <h3>{userData.name || 'No name provided'}</h3>
                    </div>
                    <div className="profile-details">
                        <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
                        <p><strong>Bio:</strong> {getBio(userData)}</p>
                    </div>
                    <button
                        className="logout-btn"
                        onClick={() => {
                            setUserData(null);
                            setEmail('');
                            setPassword('');
                            setSuccess(false);
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="assignment-11">
            <h2>Assignment 11: Axios POST and GET Requests</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Login successful!</p>}
        </div>
    );
}

export default Assignment_11;
