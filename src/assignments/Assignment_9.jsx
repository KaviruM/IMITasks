import React, { useState, useEffect } from 'react';
import './assignment_9.css';

function Assignment_9() {
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                setLoading(true);
                

                const url = new URL('https://apis.dnjs.lk/objects/colors.php');
                if (searchTerm) {
                    url.searchParams.append('search', searchTerm);
                }
                url.searchParams.append('page', page.toString());
                url.searchParams.append('limit', limit.toString());

                const response = await fetch(url.toString());

                if (!response.ok) {
                    throw new Error('Failed to fetch colors');
                }

                const data = await response.json();
                
  
                if (data.data) {
                    setColors(data.data);
                    setTotal(data.total || 0);
                } else {

                    setColors(data);
                    setTotal(data.length);
                }
                
                setError(null);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching colors:', err);

            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, [searchTerm, page, limit]);

    const handleSearch = () => {
        setSearchTerm(searchInput);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (e) => {
        setLimit(parseInt(e.target.value));
        setPage(1); 
    };


    const totalPages = Math.ceil(total / limit);


    const renderPageButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }


        if (page > 1) {
            buttons.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(page - 1)}
                    className="pagination-button"
                >
                    &lt; Previous
                </button>
            );
        }


        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-button ${i === page ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }


        if (page < totalPages) {
            buttons.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(page + 1)}
                    className="pagination-button"
                >
                    Next &gt;
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="container">
            <button
                onClick={() => window.history.back()}
                className="back-button"
            >
                Back to Home
            </button>

            <h1>Assignment 9</h1>
            <h2>Fetch Colors from API with Search and Pagination</h2>


            <div className="controls">
                <input
                    type="text"
                    placeholder="Search colors..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input"
                />
                <button
                    onClick={handleSearch}
                    className="search-button"
                >
                    Search
                </button>
                
                <label className="limit-label">
                    Items per page:
                    <select
                        value={limit}
                        onChange={handleLimitChange}
                        className="limit-select"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>


            {loading && <p>Loading colors...</p>}


            {error && (
                <div className="error-message">
                    Error: {error}
                </div>
            )}


            {!loading && !error && (
                <div>
                    <p className="results-info">
                        Showing {colors.length} of {total} color(s) 
                        {searchTerm && ` matching "${searchTerm}"`}
                        {totalPages > 1 && ` (Page ${page} of ${totalPages})`}
                    </p>
                    
                    <ul className="colors-list">
                        {colors.map((color, index) => (
                            <li key={color.id || index} className="color-item">
                                <span className="color-bullet">◉</span>
                                <span className="color-name">{color.name || 'Unknown Color'}</span>
                                {(color.hex || color.code) && (
                                    <span className="color-code">
                                        ({color.hex || color.code})
                                    </span>
                                )}
                                {color.rgb && (
                                    <span className="color-rgb">
                                        RGB: {color.rgb}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>


                    {colors.length === 0 && searchTerm && (
                        <p className="no-results">
                            No colors found matching "{searchTerm}"
                        </p>
                    )}


                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            {renderPageButtons()}
                        </div>
                    )}
                    

                    {totalPages > 1 && (
                        <div className="pagination-info">
                            Page {page} of {totalPages} ({total} total items)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Assignment_9;