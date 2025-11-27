import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'



function Assignment_7() {

    const [colors, setColors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchColors = async () => {
            try {
                axios.get('https://apis.dnjs.lk/objects/colors.php')
                    .then((response) => {
                        setColors(response.data)
                        setLoading(false)
                    })
            } catch (error) {
                setError(error)
                setLoading(false)
                
            }
        }
        fetchColors()
    }, [])
  return (
    <div className='assignment'> 

            <Link to="/">
                <button style={{ padding: '10px', marginBottom: '20px' }}>
                    Back to Home
                </button>   
            </Link>

        <h1>Assignment 7</h1>

        <h2>Fetch Colors from API</h2>

        {loading && <p>Loading colors...</p>}
        {error && <p>Error: {error.message}</p>}
        
        <ul>
            {colors.map((color) => (
                <li key={color.id}>
                    <span style={{ color: color.hex }}> ◉ {color.name}</span>
                </li>

            ))}
        </ul>

    </div>
  )
}

export default Assignment_7