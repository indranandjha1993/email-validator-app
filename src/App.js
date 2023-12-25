import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading status

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post('http://localhost:5001/validate_email', {email});
            setResponseMessage(`${response.data.reason}`);
            setIsLoading(false); // Stop loading
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Validation failed');
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <h1>Email Validator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
                <button type="submit" disabled={isLoading}>Validate</button>
            </form>
            {isLoading ? <div>Loading...</div> : <div className="response">{responseMessage}</div>}
        </div>
    );

}

export default App;
