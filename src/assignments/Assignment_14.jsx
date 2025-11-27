import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignment_11.css';

function LoginScreen({ setLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
                email,
                password,
            });

            const token = response.data.access_token;

            if (keepLoggedIn) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            setSuccess(true);
            setLoggedIn(true);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assignment-11">
            <h2>Assignment 14: Profile Update with Network Analysis</h2>
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
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        /> Keep me logged in
                    </label>
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

function ProfileScreen({ setLoggedIn }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
            return;
        }

        axios.get('https://auth.dnjs.lk/api/user', {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setUserData(res.data);
            setEditName(res.data.name || '');
            setEditDescription(res.data.profile_description || res.data.bio || res.data.description || '');
        }).catch((err) => {
            setError('Failed to fetch user data. Please login again.');
            setLoggedIn(false);
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        }).finally(() => {
            setLoading(false);
        });
    }, [setLoggedIn]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
            return;
        }

        setUpdateLoading(true);
        setUpdateError(null);
        setUpdateSuccess(false);

        try {
            const updateData = {
                name: editName,
                profile_description: editDescription,
                bio: editDescription,
                description: editDescription
            };

            let response;
            
            try {
                response = await axios.put('https://auth.dnjs.lk/api/user', updateData, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch (putError) {
                try {
                    response = await axios.patch('https://auth.dnjs.lk/api/user', updateData, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                } catch (patchError) {
                    response = await axios.post('https://auth.dnjs.lk/api/profile', updateData, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                }
            }

            setUserData(prevData => ({
                ...prevData,
                name: editName,
                profile_description: editDescription
            }));

            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);

        } catch (error) {
            console.error('Profile update failed:', error);
            setUpdateError('Failed to update profile. Please try again.');
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            }
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            await axios.post('https://auth.dnjs.lk/api/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {}

        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setLoggedIn(false);
    };

    const getBio = (data) => {
        return data.profile_description || data.bio || data.description || data.about || 'No bio available';
    };

    const getProfileImage = (data) => {
        return data.profile_pic || data.avatar || data.image || data.photo_url || 'https://via.placeholder.com/150';
    };

    if (loading) {
        return <div className="assignment-11"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="assignment-11"><p className="error">{error}</p></div>;
    }

    return (
        <div className="assignment-11">
            <h2>Assignment 14: User Profile with Edit Functionality</h2>
            <div className="user-profile">
                <div className="profile-header">
                    <img src={getProfileImage(userData)} alt="Profile" className="profile-pic" />
                    <h3>{userData.name || 'No name provided'}</h3>
                </div>
                <div className="profile-details">
                    <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
                    <p><strong>Bio:</strong> {getBio(userData)}</p>
                </div>

                <div className="profile-edit-section">
                    <h3>Edit Profile</h3>
                    <form onSubmit={handleProfileUpdate}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Enter your bio/description"
                                rows="4"
                            />
                        </div>
                        <button type="submit" disabled={updateLoading}>
                            {updateLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                    
                    {updateSuccess && <p className="success">Profile updated successfully!</p>}
                    {updateError && <p className="error">{updateError}</p>}
                </div>

                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

function Assignment_14() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
        setInitialCheckDone(true);
    }, []);

    if (!initialCheckDone) {
        return <div className="assignment-11"><p>Loading...</p></div>;
    }

    return loggedIn ? (
        <ProfileScreen setLoggedIn={setLoggedIn} />
    ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
    );
}

export default Assignment_14;