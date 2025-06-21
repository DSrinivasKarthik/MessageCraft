import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { recipient, context, tone, details } = await request.json();

        const prompt = `Compose an email/message:
        Recipient: ${recipient}
        Context/Purpose: ${context}
        Tone: ${tone}
        Details: ${details || "None"}

        Generated Message:`;

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set.");
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Replace if needed
                messages: [
                    { role: "system", content: "You are a helpful assistant that composes emails and messages." },
                    { role: "user", content: prompt },
                ],
                max_tokens: 200,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Groq API Error: ${response.status} - ${errorData?.error?.message || "Unknown error"}`);
        }

        const data = await response.json();
        const message = data.choices[0].message.content.trim();

        return NextResponse.json({ message });
    } catch (error: unknown) {
        console.error("Error with Groq API:", error);
        let errorMessage = "An unknown error occurred.";
        if (typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string") {
            errorMessage = (error as { message: string }).message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}