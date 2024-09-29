"use client";
import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError(null);
        setSuggestions(null); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        setLoading(true); 
        
        setError(null); 

        try {
            const res = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            setLoading(false); 

            if (res.ok) {
                setSuggestions(data.suggestions); 
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setLoading(false);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div>
            <h1>Upload Your Credit Report</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="application/pdf" />
                {file && <p>Selected file: {file.name}</p>}
                <button type="submit">Upload</button>
            </form>

            {loading && <p>Loading suggestions, please wait...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {suggestions && (
                <div>
                    <h2>AI Suggestions:</h2>
                    <p>{suggestions}</p> 
                </div>
            )}
        </div>
    );
}
