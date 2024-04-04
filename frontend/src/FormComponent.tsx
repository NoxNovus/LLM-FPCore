import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createPrompt } from './prompt';

interface FormProps {
  apiKey: string;
}

const FormComponent: React.FC<FormProps> = ({ apiKey }) => {
  const [inputExpression, setInputExpression] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputExpression(event.target.value);
  };

  const genAI = new GoogleGenerativeAI(apiKey);

  async function LLM_convert() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = createPrompt(inputExpression);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const fpcore_result = await LLM_convert();
      setResponse(fpcore_result);
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
            value={inputExpression}
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
