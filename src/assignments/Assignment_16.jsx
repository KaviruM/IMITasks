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

function PasswordChangeSection() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = () => {
        if (!currentPassword || !newPassword || !reEnterPassword) {
            return 'All fields are required';
        }

        if (newPassword !== reEnterPassword) {
            return 'New passwords do not match';
        }

        if (newPassword.length < 8 || newPassword.length > 40) {
            return 'Password must be 8-40 characters long';
        }

        const hasNumber = /\d/.test(newPassword);
        const hasSpecial = /[*\/\-@#$]/.test(newPassword);
        const hasLower = /[a-z]/.test(newPassword);
        const hasUpper = /[A-Z]/.test(newPassword);

        if (!(hasNumber && hasSpecial && hasLower && hasUpper)) {
            return 'Password must include: number, special character (*/-@#$), lowercase and uppercase letters';
        }

        return '';
    };

    const handlePasswordChange = async () => {
        const validationError = validatePassword();
        if (validationError) {
            setError(validationError);
            setSuccess('');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) {
                setError('You are not logged in. Please log in again.');
                setLoading(false);
                return;
            }

            const payload = {
                current_password: currentPassword,
                new_password: newPassword,
                password_confirmation: reEnterPassword
            };

            const response = await axios.post(
                'https://auth.dnjs.lk/api/change-password',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Password Change Response:', response.data);

            if (response.status === 200 || response.data?.message?.toLowerCase().includes('success')) {
                setSuccess('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setReEnterPassword('');
            } else {
                setError(response.data?.message || 'Password change failed.');
            }

        } catch (error) {
            console.error('Password change failed:', error.response?.data || error.message);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Password change failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="password-change-section">
            <h3>Change Password</h3>
            <div>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                />
            </div>
            <div>
                <label>Re-enter New Password:</label>
                <input
                    type="password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    placeholder="Re-enter new password"
                />
            </div>
            <button 
                onClick={handlePasswordChange}
                disabled={loading}
            >
                {loading ? 'Changing...' : 'Change Password'}
            </button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
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
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select an image file');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('File size must be less than 5MB');
                return;
            }

            setSelectedFile(file);
            setUploadError(null);
            
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

            const response = await axios.post(
                'https://auth.dnjs.lk/api/avatar', 
                formData,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setUserData(prevData => ({
                ...prevData,
                profile_pic: response.data.avatar_url || previewUrl,
                avatar: response.data.avatar_url || previewUrl
            }));

            setUploadSuccess(true);
            setSelectedFile(null);
            setPreviewUrl(null);
            
            const fileInput = document.getElementById('avatar-upload');
            if (fileInput) {
                fileInput.value = '';
            }

            setTimeout(() => setUploadSuccess(false), 3000);

        } catch (error) {
            setUploadError('Failed to upload avatar. Please try again.');
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
        return data.profile_description || data.bio || data.description || 'No bio available';
    };

    const getProfileImage = (data) => {
        return data.profile_pic || data.avatar || 'https://via.placeholder.com/150';
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

                <PasswordChangeSection />

                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

function Assignment_16() {
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

export default Assignment_16;