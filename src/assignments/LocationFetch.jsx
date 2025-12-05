import { useState } from 'react';

const SriLankaLocationTracker = () => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nearestCity, setNearestCity] = useState(null);

  const mapData = {"Ampara":{"Akkaraipattu":{"labels":{"si":"අක්කරපත්තුව","ta":"NULL"},"code":"32400","latitude":"7.2167","longitude":"81.85"},"Ampara":{"labels":{"si":"අම්පාර","ta":"NULL"},"code":"32000","latitude":"7.2833","longitude":"81.6667"}},"Colombo":{"Colombo 1":{"labels":{"si":"කොළඹ 1","ta":"கொழும்பு 1"},"code":"100","latitude":"6.925833","longitude":"79.841667"},"Colombo 2":{"labels":{"si":"කොළඹ 2","ta":"கொழும்பு 2"},"code":"200","latitude":"6.926944","longitude":"79.848611"},"Dehiwala":{"labels":{"si":"දෙහිවල","ta":"NULL"},"code":"10350","latitude":"6.856387","longitude":"79.865156"},"Maharagama":{"labels":{"si":"NULL","ta":"NULL"},"code":"10280","latitude":"6.843401","longitude":"79.932766"},"Nugegoda":{"labels":{"si":"NULL","ta":"NULL"},"code":"10250","latitude":"6.877563","longitude":"79.886231"}},"Kandy":{"Kandy":{"labels":{"si":"NULL","ta":"NULL"},"code":"20000","latitude":"7.2964","longitude":"80.635"},"Peradeniya":{"labels":{"si":"NULL","ta":"NULL"},"code":"20400","latitude":"7.2631","longitude":"80.6028"}},"Galle":{"Galle":{"labels":{"si":"ගාල්ල","ta":"NULL"},"code":"80000","latitude":"6.0536","longitude":"80.2117"},"Hikkaduwa":{"labels":{"si":"NULL","ta":"NULL"},"code":"80240","latitude":"6.139535","longitude":"80.113201"}}};

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestCity = (lat, lon) => {
    let nearest = null;
    let minDistance = Infinity;

    Object.keys(mapData).forEach(district => {
      Object.keys(mapData[district]).forEach(city => {
        const cityData = mapData[district][city];
        const cityLat = parseFloat(cityData.latitude);
        const cityLon = parseFloat(cityData.longitude);

        const distance = calculateDistance(lat, lon, cityLat, cityLon);

        if (distance < minDistance) {
          minDistance = distance;
          nearest = {
            name: city,
            district,
            distance: distance.toFixed(2),
            code: cityData.code
          };
        }
      });
    });

    return nearest;
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setPosition(null);
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);

        const { latitude, longitude, accuracy } = pos.coords;

        setPosition({
          latitude,
          longitude,
          accuracy,
        });

        const nearest = findNearestCity(latitude, longitude);
        setNearestCity(nearest);
      },

      (err) => {
        setLoading(false);
        setPosition(null);

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
    );
  };

  return (
    <div className='container'>
      <h1>Sri Lanka Location Tracker</h1>

      <button onClick={getLocation} disabled={loading}>
        {loading ? "Getting Location..." : "Get My Location"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {position && (
        <div className="position-info">
          <h3>Your Coordinates</h3>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <p>Accuracy: ±{position.accuracy} meters</p>
        </div>
      )}

      {nearestCity && (
        <div className="nearest-city-info">
          <h3>Nearest City</h3>
          <p>City: {nearestCity.name}</p>
          <p>District: {nearestCity.district}</p>
          <p>Distance: {nearestCity.distance} km</p>
          <p>Postal Code: {nearestCity.code}</p>
        </div>
      )}
    </div>
  );
};

export default SriLankaLocationTracker;