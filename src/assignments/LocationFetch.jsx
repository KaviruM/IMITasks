import { useState } from 'react';
import './LocationFetch.css';

function LocationFetch() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLocation(null);
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (err) => {
        setLoading(false);
        setLocation(null);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Permission denied. Please allow location access in your browser.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Position unavailable.');
            break;
          case err.TIMEOUT:
            setError('Timed out while retrieving location.');
            break;
          default:
            setError(err.message || 'An unknown error occurred.');
        }
        console.error('Error getting location:', err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <>
      <div className='location-fetch-component'>
        <h2>Location Fetch Component</h2>
        <p>Click the button to request your current location.</p>
        <button onClick={getLocation} disabled={loading}>
          {loading ? 'Getting location…' : 'Get Location'}
        </button>

        {error &&
          <div className="error">
            <p>Error: {error}</p>
          </div>
        }

        {location &&
          <div className="location">
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Accuracy: {location.accuracy} meters</p>
          </div>
        }
      </div>
    </>
  );
}

export default LocationFetch;