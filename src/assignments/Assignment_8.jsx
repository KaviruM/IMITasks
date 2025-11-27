import React, { useState, useEffect } from 'react';

function Assignment_8() {
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchColors = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://apis.dnjs.lk/objects/colors.php');

                if (!response.ok) {
                    throw new Error('Failed to fetch colors');
                }

                const data = await response.json();
                setColors(data);
                setError(null);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching colors:', err);

            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, []);



    
    const filteredColors = colors.filter(color =>
        color.name && color.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    return (
        <div style={{ margin: '20px' }}>
            <button
                onClick={() => window.history.back()}
                style={{ padding: '10px', marginBottom: '20px' }}
            >
                Back to Home
            </button>


            <h1>Assignment 8</h1>
            <h2>Fetch Colors from API with Search</h2>


            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search colors..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                />
                <button
                    onClick={handleSearch}
                    style={{ padding: '8px 16px' }}
                >
                    Search
                </button>
            </div>



            {loading && <p>Loading colors...</p>}

            {error && (
                <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
                    Error: {error}
                </div>
            )}


            {!loading && !error && (
                <div>
                    <p>Found {filteredColors.length} color(s) {searchTerm && `matching "${searchTerm}"`}</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {filteredColors.map((color, index) => (
                            <li key={color.id || index} style={{ marginBottom: '8px' }}>
                                <span style={{ color: color.hex || '' }}>
                                    ◉ {color.name || 'Unknown Color'}
                                </span>
                                {color.hex && (
                                    <span style={{ marginLeft: '10px', color: '#666' }}>
                                        ({color.hex})
                                    </span>
                                )}

                                {color.rgb && (
                                    <span style={{ marginLeft: '10px', color: '#666' }}>
                                        RGB: {color.rgb}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>


                    {filteredColors.length === 0 && searchTerm && (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>
                            No colors found matching "{searchTerm}"
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}


export default Assignment_8;