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
        <div className="assignment-15">
            <h2>Assignment 15: Profile Update with Avatar Upload</h2>
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
    
    // Avatar upload states
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select an image file');
                return;
            }
            
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('File size must be less than 5MB');
                return;
            }

            setSelectedFile(file);
            setUploadError(null);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select an image file');
            return;
        }

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
            return;
        }

        setUploadLoading(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            formData.append('profile_pic', selectedFile);
            formData.append('image', selectedFile);

            let response;
            
            // Try different possible endpoints for avatar upload
            const endpoints = [
                'https://auth.dnjs.lk/api/avatar',
                'https://auth.dnjs.lk/api/profile/avatar',
                'https://auth.dnjs.lk/api/user/avatar',
                'https://auth.dnjs.lk/api/upload/avatar',
                'https://auth.dnjs.lk/api/profile-pic'
            ];

            let uploadSuccessful = false;
            let lastError = null;

            for (const endpoint of endpoints) {
                try {
                    response = await axios.post(endpoint, formData, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    uploadSuccessful = true;
                    break;
                } catch (error) {
                    lastError = error;
                    // Try PUT method for some endpoints
                    try {
                        response = await axios.put(endpoint, formData, {
                            headers: { 
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        uploadSuccessful = true;
                        break;
                    } catch (putError) {
                        // Continue to next endpoint
                        continue;
                    }
                }
            }

            if (!uploadSuccessful) {
                throw lastError;
            }

            // Update user data with new avatar
            setUserData(prevData => ({
                ...prevData,
                profile_pic: response.data.avatar_url || response.data.profile_pic || response.data.image_url || previewUrl,
                avatar: response.data.avatar_url || response.data.profile_pic || response.data.image_url || previewUrl
            }));

            setUploadSuccess(true);
            setSelectedFile(null);
            setPreviewUrl(null);
            
            // Clear the file input
            const fileInput = document.getElementById('avatar-upload');
            if (fileInput) {
                fileInput.value = '';
            }

            setTimeout(() => setUploadSuccess(false), 3000);

        } catch (error) {
            console.error('Avatar upload failed:', error);
            setUploadError('Failed to upload avatar. Please try again.');
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            }
        } finally {
            setUploadLoading(false);
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
        return <div className="assignment-15"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="assignment-15"><p className="error">{error}</p></div>;
    }

    return (
        <div className="assignment-15">
            <h2>Assignment 15: User Profile with Avatar Upload</h2>
            <div className="user-profile">
                <div className="profile-header">
                    <img src={getProfileImage(userData)} alt="Profile" className="profile-pic" />
                    <h3>{userData.name || 'No name provided'}</h3>
                </div>
                <div className="profile-details">
                    <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
                    <p><strong>Bio:</strong> {getBio(userData)}</p>
                </div>

                {/* Avatar Upload Section */}
                <div className="avatar-upload-section">
                    <h3>Upload Avatar</h3>
                    <div className="avatar-upload-container">
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <label htmlFor="avatar-upload" className="file-label">
                            Choose Image File
                        </label>
                        
                        {selectedFile && (
                            <div className="file-info">
                                <p>Selected: {selectedFile.name}</p>
                                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        )}
                        
                        {previewUrl && (
                            <div className="preview-container">
                                <img src={previewUrl} alt="Preview" className="preview-image" />
                            </div>
                        )}
                        
                        <button 
                            className="upload-btn"
                            onClick={handleAvatarUpload}
                            disabled={!selectedFile || uploadLoading}
                        >
                            {uploadLoading ? 'Uploading...' : 'Upload Avatar'}
                        </button>
                    </div>
                    
                    {uploadSuccess && <p className="success">Avatar uploaded successfully!</p>}
                    {uploadError && <p className="error">{uploadError}</p>}
                </div>

                {/* Profile Edit Section */}
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

function Assignment_15() {
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
        return <div className="assignment-15"><p>Loading...</p></div>;
    }

    return loggedIn ? (
        <ProfileScreen setLoggedIn={setLoggedIn} />
    ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
    );
}

export default Assignment_15;