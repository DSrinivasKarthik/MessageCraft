from flask import Flask, render_template, request, jsonify
import os
from groq import Groq
from dotenv import load_dotenv
import traceback  # Import traceback for detailed error info

load_dotenv()

app = Flask(__name__,static_folder='static', template_folder='templates') #adding static folder to use CSS,images,etc

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable not set.")

client = Groq(api_key=GROQ_API_KEY)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        recipient = request.form.get("recipient")
        context = request.form.get("context")
        tone = request.form.get("tone")
        details = request.form.get("details")

        if not recipient or not context or not tone:
            return jsonify({"error": "Recipient, context, and tone are required."}), 400

        try:
            prompt = f"""
            Compose an email/message:
            Recipient: {recipient}
            Context/Purpose: {context}
            Tone: {tone}
            Details: {details or "None"}

            Generated Message:
            """
            print(f"Prompt being sent to Groq:\n{prompt}") # Print the prompt

            chat_completion = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that composes emails and messages."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=200,
                temperature=0.7,
            )
            print(f"Full Groq API Response:\n{chat_completion}") # Print the full response

            message = chat_completion.choices[0].message.content.strip()
            print(f"Extracted Message:\n{message}")

            return jsonify({"message": message})

        except Exception as e:
            tb_str = traceback.format_exc() # Capture the full traceback
            print(f"An error occurred:\n{tb_str}") # Print the full traceback
            return jsonify({"error": f"An unexpected error occurred: {e}"}), 500 # Return the error message

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)