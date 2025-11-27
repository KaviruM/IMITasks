import React, { useState } from 'react'
import axios from 'axios'
import './Assignment_11.css'

function Assignment_10() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

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
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Login successful:', response.data);
            setSuccess(true);
            setLoading(false);
            
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <>
            <div className="assignment-10">
                <h2>Assignment 10: Axios POST Request</h2>
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
                
                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>Login successful!</p>}
            </div>
        </>
    )
}

export default Assignment_10