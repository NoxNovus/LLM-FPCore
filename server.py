from flask import Flask, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = 'your_openai_api_key_here'
PORT = 5000

@app.route('/ping', methods=['POST'])
def root():
    return jsonify({"status": "ok", "response": "Pong!"})

@app.route('/ask', methods=['POST'])
def ask_question():
    question = request.json['question']

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  
            prompt=question,
            max_tokens=100 
        )

        return jsonify({'response': response.choices[0].text.strip()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
