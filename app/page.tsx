'use client'; // Important for interactive components

import { useState } from 'react';

export default function Home() {
    const [recipient, setRecipient] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState('formal');
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipient, context, tone, details }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.error || 'An error occurred.');
            }
        } catch (err: any) { // Type the error
            setError(err.message || 'A network error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1>AI Email/Message Composer</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="recipient">Recipient:</label><br />
                <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }} /><br /><br />

                <label htmlFor="context">Context/Purpose:</label><br />
                <input type="text" id="context" value={context} onChange={(e) => setContext(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }} /><br /><br />

                <label htmlFor="tone">Tone:</label><br />
                <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}>
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="friendly">Friendly</option>
                    <option value="urgent">Urgent</option>
                </select><br /><br />

                <label htmlFor="details">Key Details (Optional):</label><br />
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', height: '100px' }}></textarea><br /><br />

                <button type="submit" disabled={isLoading} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {isLoading ? "Generating..." : "Generate Message"}
                </button>
            </form>

            {message && <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Generated Message:</h2>
                <p>{message}</p>
            </div>}
        </div>
    );
}