import React, { useState, useEffect } from 'react';
import axios from "axios"
function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  // Replace with actual client ID and secret (avoid hardcoding)
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';

  useEffect(() => {
    const fetchToken = async () => {
      const body = "scopes=PublicApi.Access&grant_type=client_credentials&client_id=5c6dc75f-2fc1-4052-901f-43268c73dd05&client_secret=FA574711D2414211A677A3EA8F1F8EE0BBD3A791"

      axios.post('/connect/token', body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((response) => {
          console.log(response)
          setToken(response.data.access_token);
        }).catch((error) => {
          console.log("Error", error)
        })
    };

    fetchToken();
  }, []); // Empty dependency array to fetch token only once

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleClick = async () => {
    if (!token) {
      console.error('Access token not available yet');
      return;
    }

    const url = `/customers?contactNumber=${phoneNumber}`;
    await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Retailer': 'tigris'
      }
    }).then((response) => {
      console.log(response)
      setUser(response.data.data[0]);
    }).catch((error) => {
      console.log("Error", error)
    })
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <button onClick={handleClick} disabled={!token}>
        Get Customer Data
      </button>

      <div>
        {user != 'undefine' && user.name}
      </div>
    </div>
  );
}

export default App;
