// page.tsx
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
        <div className="container">
            <h1 className="title">MessageCraft </h1> 
            <h1 className="title"> An AI Email / Message Composer</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="recipient" className="label">Recipient:</label>
                <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} required className="input" />

                <label htmlFor="context" className="label">Context/Purpose:</label>
                <input type="text" id="context" value={context} onChange={(e) => setContext(e.target.value)} required className="input" />

                <label htmlFor="tone" className="label">Tone:</label>
                <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} required className="input">
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="friendly">Friendly</option>
                    <option value="urgent">Urgent</option>
                </select>

                <label htmlFor="details" className="label">Key Details (Optional):</label>
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} className="textarea"></textarea>

                <button type="submit" disabled={isLoading} className="button">
                    {isLoading ? "Generating..." : "Generate Message"}
                </button>
            </form>

            {message && <div className="message-box">
                <h2 className="message-title">Generated Message:</h2>
                <p>{message}</p>
            </div>}
        </div>
    );
}