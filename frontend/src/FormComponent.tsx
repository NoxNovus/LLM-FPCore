import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createPrompt } from './prompt';

interface FormProps {
  apiKey: string;
}

const FormComponent: React.FC<FormProps> = ({ apiKey }) => {
  const [inputExpression, setInputExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputExpression(event.target.value);
  };

  const genAI = new GoogleGenerativeAI(apiKey);

  const sampleURL = 'http://127.0.0.1:8000/api/sample';

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

    let fpcore_result = '(FPCore (x) :pre (<= -1e+308 x 1e+308) (- (sqrt (+ x 1)) (sqrt x)))';

    try {
      // fpcore_result = await LLM_convert();
    } catch (error) {
      console.error('Error:', error);
    }

    const herbie_result = await fetch(
      sampleURL,
      {
        method: 'POST', 
        body: `{"formula":"${fpcore_result}","seed":5}`
      }
    );

    console.log (herbie_result);
    setResult("hello");
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
      {result && (
        <div>
          <h2>Response:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
