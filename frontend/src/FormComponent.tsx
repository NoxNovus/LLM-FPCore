import React, { useState } from 'react';

interface FormProps {
  apiKey: string;
}

const FormComponent: React.FC<FormProps> = ({ apiKey }) => {
  const [code, setCode] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // Or any other GPT model you prefer
          prompt: code,
          max_tokens: 150, // Adjust according to your needs
          temperature: 0.7, // Adjust according to your needs
          stop: '\n' // Stop generation at a new line
        })
      };

      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();

      setResponse(data.choices[0].text.trim());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Enter your code:</label>
          <textarea
            id="code"
            value={code}
            onChange={handleChange}
            rows={10}
            cols={50}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
